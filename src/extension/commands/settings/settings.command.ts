import * as vscode from "vscode";
import { ExtensionCommand } from "../../../shared/definitions/extension.definitions";
import { CONFIGURATION } from "../../../shared/definitions/settings.definitions";

export function settingsCommand(): ExtensionCommand {
  const callback = () => () => vscode.commands.executeCommand("workbench.action.openSettings", CONFIGURATION);
  return { command: "test-rail-sync-extension.settings", callback };
}
