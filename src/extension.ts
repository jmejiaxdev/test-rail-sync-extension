import * as vscode from "vscode";
import { settingsCommand } from "./extension/commands/settings.command";
import { syncTestCasesCommand } from "./extension/commands/syncTestCases.command";

export function activate(context: vscode.ExtensionContext): void {
  const extensionCommands = [syncTestCasesCommand, settingsCommand];

  extensionCommands.forEach((extensionCommand) => {
    const { command, callback } = extensionCommand();
    if (!command || !callback) return;

    const registeredCommand = vscode.commands.registerCommand(command, callback(context));
    context.subscriptions.push(registeredCommand);
  });
}

export function deactivate(): void {}
