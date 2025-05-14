import * as vscode from "vscode";
import { ExtensionCommand, ExtensionMessage } from "../../shared/definitions/extension.definitions";
import { TestCase } from "../../shared/definitions/testCase.definitions";
import { createWebviewPanel } from "../clients/vsCode.client";
import { loadHandler } from "../handlers/load.handler";
import { saveHandler } from "../handlers/save.handler";

export function syncCommand(): ExtensionCommand {
  const command = "test-rail-sync-extension.sync";

  const callback = (context: vscode.ExtensionContext) => async (uri: vscode.Uri) => {
    try {
      const panel = createWebviewPanel(context, command, "webview.sync", "Sync test cases to TestRail");

      const handleDidReceiveMessage = async (message: ExtensionMessage): Promise<void> => {
        switch (message.type) {
          case "init":
            const data = await loadHandler(uri.fsPath);
            panel.webview.postMessage({ type: "load", data });
            break;
          case "save":
            vscode.window.showInformationMessage("Saving test cases ⚙️");
            await saveHandler(uri.fsPath, message.data as TestCase[]);
            vscode.window.showInformationMessage("Test cases saved successfully ✅");
            break;
          case "error":
            vscode.window.showErrorMessage(JSON.stringify({ error: message?.error }));
            break;
          default:
            break;
        }
      };

      panel.webview.onDidReceiveMessage(handleDidReceiveMessage);
    } catch (error) {
      vscode.window.showErrorMessage(JSON.stringify({ error }));
    }
  };

  return {
    command,
    callback,
  };
}
