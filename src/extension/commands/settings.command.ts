import * as vscode from "vscode";
import { ExtensionCommand } from "../../shared/definitions/extension.definitions";
import { CONFIG_ROOT } from "../../shared/definitions/settings.definitions";

export function settingsCommand(): ExtensionCommand {
  const callback = () => () => vscode.commands.executeCommand("workbench.action.openSettings", CONFIG_ROOT);

  return {
    command: "test-rail-sync-extension.settings",
    callback,
  };
}
