import * as vscode from "vscode";

export type ExtensionCommand = {
  command?: "test-rail-sync-extension.settings" | "test-rail-sync-extension.sync";
  callback?: (context: vscode.ExtensionContext) => (uri: vscode.Uri) => void;
};

export type ExtensionMessage = {
  type?: "sync-init" | "sync-load" | "sync-save" | "view-error";
  data?: unknown;
  error?: string;
};

export type ExtensionRoute = "webview.sync";
