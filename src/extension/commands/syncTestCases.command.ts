import * as vscode from "vscode";
import { ExtensionCommand, ExtensionMessage } from "../../shared/definitions/extension.definitions";
import { TestCase } from "../../shared/definitions/testCase.definitions";
import { createWebviewPanel } from "../clients/vsCode.client";
import { loadTestCasesHandler } from "../handlers/loadTestCases.handler";
import { saveTestCasesHandler } from "../handlers/saveTestCases.handler";

export function syncTestCasesCommand(): ExtensionCommand {
  const command = "test-rail-sync-extension.sync";

  const callback = (context: vscode.ExtensionContext) => async (uri: vscode.Uri) => {
    try {
      const panel = createWebviewPanel(context, command, "webview.sync", "Sync test cases to TestRail");

      const handleDidReceiveMessage = async (message: ExtensionMessage): Promise<void> => {
        switch (message.type) {
          case "init":
            const data = await loadTestCasesHandler(uri.fsPath);
            panel.webview.postMessage({ type: "load", data });
            break;
          case "save":
            vscode.window.showInformationMessage("Saving test cases ⚙️");
            await saveTestCasesHandler(message.data as TestCase[]);
            // fs.writeFileSync(path, content, "utf8");
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
      console.error("Error in sync command:", error);
      vscode.window.showErrorMessage(JSON.stringify({ error }));
    }
  };

  return {
    command,
    callback,
  };
}
