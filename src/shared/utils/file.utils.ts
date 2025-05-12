import * as fs from "fs";
import * as path from "path";
import { TestCase } from "../definitions/testCase.definitions";

const regex = /(test|it)\s*\(\s*['"]\s*([0-9]*\s*:\s*)?(.*?)\s*['"]\s*,/g;

const formatId = (id: string): string => id.replace(":", "").trim();

const formatTitle = (title: string): string => title.trim();

export function readPackageProperties(): any {
  const packagePath = path.join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

  const config = packageJson.contributes?.configuration;
  const properties = config?.properties;

  if (!properties) {
    throw new Error("No properties found in package.json");
  }

  return properties;
};

export function extractDescriptions(fileContent: string): Pick<TestCase, "id" | "title">[] {
  let match;
  const results = [];

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[2] ? Number(formatId(match[2])) : undefined;
    const title = formatTitle(match[3]);
    results.push({ id, title });
  }

  return results;
}

export function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}

export function replaceDescriptions(fileContent: string, testCases: TestCase[]): string {
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[2];
    const title = match[3];

    if (id) {
      const testCase = testCases.find((testCase) => String(testCase.id) === formatId(id));

      if (testCase?.title && testCase.title !== title) {
        fileContent = fileContent.replace(title, testCase.title);
      }
    } else {
      const formattedTitle = formatTitle(match[3]);
      const testCase = testCases.find((testCase) => testCase.title === formattedTitle);

      if (testCase?.id) {
        fileContent = fileContent.replace(formattedTitle, `${testCase.id}: ${testCase.title}`);
      }
    }
  }

  return fileContent;
}

export function writeFile(path: string, content: string): void {
  fs.writeFileSync(path, content, "utf8");
}
