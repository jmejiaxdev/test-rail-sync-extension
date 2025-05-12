import * as vscode from "vscode";
import { ExtensionCommand, ExtensionRoute } from "../definitions/extension.definitions";

export function createWebviewPanel(
  context: vscode.ExtensionContext,
  command: ExtensionCommand["command"],
  route: ExtensionRoute,
  title: string,
): vscode.WebviewPanel {
  if (!command) throw new Error("Command is missing");

  const panel = vscode.window.createWebviewPanel(command, title, vscode.ViewColumn.One, {
    enableScripts: true,
  });

  const reactAppPath = panel.webview
    .asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview.js"))
    .toString();

  panel.webview.html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TestRail Sync</title>
    </head>
    <body>
        <div id="root"></div>
        <script>
          window.route = "${route}";
          window.vscode = acquireVsCodeApi();
        </script>
        <script type="text/javascript" src="${reactAppPath}"></script>
    </body>
    </html>
  `;

  return panel;
}
