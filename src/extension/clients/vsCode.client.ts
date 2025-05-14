import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { ExtensionCommand, ExtensionRoute } from "../../shared/definitions/extension.definitions";
import { TestCaseOptions } from "../../shared/definitions/testCase.definitions";
import {
  ApiSettings,
  TestCaseSettings,
  TestCaseOptionsSettings,
  CONFIG_TEST_CASE_PREFIX,
  CONFIG_ROOT,
} from "../../shared/definitions/settings.definitions";

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

export function readApiSettings(): ApiSettings {
  const config = vscode.workspace.getConfiguration(CONFIG_ROOT);

  const organizationUrl = config.get<string>("api.organizationUrl");
  if (!organizationUrl) throw new Error("API organization URL is missing");

  const username = config.get<string>("api.username");
  if (!username) throw new Error("API username is missing");

  const key = config.get<string>("api.key");
  if (!key) throw new Error("API key is missing");

  const projectId = config.get<string>("api.projectId");
  if (!projectId) throw new Error("API project ID is missing");

  return {
    organizationUrl,
    username,
    key,
    projectId,
  };
}

export function readPackageProperties(): any {
  const packagePath = path.join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

  const config = packageJson.contributes?.configuration;
  const properties = config?.properties;

  if (!properties) {
    throw new Error("No properties found in package.json");
  }

  return properties;
}

export function readTestCaseSettings(): TestCaseSettings {
  const config = vscode.workspace.getConfiguration(CONFIG_ROOT);

  const testCase = {
    section_id: null,
    suite_id: null,
    template_id: null,
    type_id: null,
    priority_id: null,
    custom_manual_vs_automated: null,
    custom_manual_automated: null,
    custom_automation_tool_type: null,
    custom_test_level: null,
  };

  Object.keys(testCase).forEach((option) => {
    const value = config.get<number>(`testCase.${option}`);
    // @ts-ignore
    testCase[option] = value;
  });

  return testCase as unknown as TestCaseSettings;
}

export function readTestCaseOptionsSettings(): TestCaseOptionsSettings {
  const properties = readPackageProperties();

  const testCaseOptions = Object.entries(properties).filter(
    ([key, value]: [string, any]) => key.startsWith(CONFIG_TEST_CASE_PREFIX) && value?.enum && value?.enumItemLabels,
  );

  const options: TestCaseOptionsSettings = {};

  testCaseOptions.forEach(([key, value]: [string, any]) => {
    const field = key.replace(CONFIG_TEST_CASE_PREFIX, "") as keyof TestCaseOptions;
    const toOption = (label: string, index: number) => ({ label, value: value.enum[index] });
    options[field] = (value.enumItemLabels as string[]).map(toOption);
  });

  return options;
}
