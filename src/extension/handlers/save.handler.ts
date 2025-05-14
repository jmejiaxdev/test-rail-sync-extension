import * as fs from "fs";
import { addCase } from "../clients/testRail.client";
import { TestCase } from "../../shared/definitions/testCase.definitions";
import { replaceDescriptions } from "../../shared/utils/descriptions.utils";

async function saveTestCases(testCases: TestCase[]): Promise<void> {
  const promises = testCases.map((testCase) => addCase(testCase));
  await Promise.all(promises);
}

async function writeTestCases(filePath: string, testCases: TestCase[]): Promise<void> {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const newFileContent = replaceDescriptions(fileContent, testCases);
  fs.writeFileSync(filePath, newFileContent, "utf8");
}

export async function saveHandler(filePath: string, testCases: TestCase[]): Promise<void> {
  await saveTestCases(testCases);
  await writeTestCases(filePath, testCases);
}
