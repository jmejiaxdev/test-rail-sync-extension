import * as vscode from "vscode";
import {
  ApiSettings,
  CONFIGURATION,
  CONFIGURATION_TEST_CASE,
  TestCaseOptionsSettings,
  TestCaseSettings,
} from "../../shared/definitions/settings.definitions";
import { TestCaseOptions } from "../../shared/definitions/testCase.definitions";
import { getTestCaseOptionsSettings, readPackageProperties } from "../../shared/utils/settings.utils";

export function readApiSettings(): ApiSettings {
  const config = vscode.workspace.getConfiguration(CONFIGURATION);

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

export function readTestCaseSettings(): TestCaseSettings {
  const config = vscode.workspace.getConfiguration(CONFIGURATION);

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

  const options: TestCaseOptionsSettings = {};
  const testCaseOptions = getTestCaseOptionsSettings(properties);

  testCaseOptions.forEach(([key, value]: [string, any]) => {
    const field = key.replace(CONFIGURATION_TEST_CASE, "") as keyof TestCaseOptions;
    const toOption = (label: string, index: number) => ({ label, value: value.enum[index] });
    options[field] = (value.enumItemLabels as string[]).map(toOption);
  });

  return options;
}
