import * as path from "path";
import * as fs from "fs";
import { CONFIGURATION_TEST_CASE } from "../definitions/settings.definitions";

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

export function getTestCaseOptionsSettings(properties: any): any {
  return Object.entries(properties).filter(
    ([key, value]: [string, any]) => key.startsWith(CONFIGURATION_TEST_CASE) && value?.enum && value?.enumItemLabels,
  );
}
