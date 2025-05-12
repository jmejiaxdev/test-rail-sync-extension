import * as vscode from "vscode";
import { ExtensionCommand, ExtensionMessage } from "../../../shared/definitions/extension.definitions";
import { TestCase } from "../../../shared/definitions/testCase.definitions";
import { createWebviewPanel } from "../../../shared/utils/extension.utils";
import { syncInit } from "../../messages/syncTestCases/syncInitTestCases.message";
import { syncSave } from "../../messages/syncTestCases/syncSaveTestCases.message";

export function syncTestCasesCommand(): ExtensionCommand {
  const command = "test-rail-sync-extension.sync";

  const callback = (context: vscode.ExtensionContext) => async (uri: vscode.Uri) => {
    try {
      const panel = createWebviewPanel(context, command, "webview.sync", "Sync test cases to TestRail");

      const handleDidReceiveMessage = async (message: ExtensionMessage): Promise<void> => {
        switch (message.type) {
          case "sync-init":
            const data = await syncInit(uri.fsPath);
            panel.webview.postMessage({ type: "sync-load", data });
            break;
          case "sync-save":
            vscode.window.showInformationMessage("Saving test cases ⚙️");
            await syncSave(message.data as TestCase[]);
            vscode.window.showInformationMessage("Test cases saved successfully ✅");
            break;
          case "view-error":
            vscode.window.showErrorMessage(JSON.stringify({ error: message?.error }));
            break;
          default:
            break;
        }
      };
      panel.webview.onDidReceiveMessage(handleDidReceiveMessage);
    } catch (error) {
      console.error("Error in sync command:", error);
      vscode.window.showErrorMessage(JSON.stringify({ error }));
    }
  };

  return { command, callback };
}
