import * as fs from "fs";
import { getCase, getSections, getSuites } from "../clients/testRail.client";
import { readTestCaseOptionsSettings, readTestCaseSettings } from "../clients/vsCode.client";
import { TestCase, TestCaseOption, TestCaseOptions } from "../../shared/definitions/testCase.definitions";
import { readDescriptions } from "../../shared/utils/descriptions.utils";

async function readTestCases(path: string): Promise<TestCase[]> {
  const fileContent = fs.readFileSync(path, "utf8");

  const descriptions = readDescriptions(fileContent);
  const settings = readTestCaseSettings();

  const testCases = (
    await Promise.all(
      descriptions.map(async (testCase) =>
        testCase?.id ? await getCase(testCase.id) : { ...settings, title: testCase?.title },
      ),
    )
  ).filter((testCase) => !!testCase);

  return testCases;
}

const getSuiteOptions = async (): Promise<TestCaseOption[]> => {
  const response = await getSuites();

  return response.map((suite) => ({
    label: suite.name,
    value: suite.id,
  }));
};

const getSectionOptions = async (testCases: TestCase[]): Promise<TestCaseOption[]> => {
  const suiteIds = testCases.map((testCase) => testCase.suite_id).filter(Boolean);
  const distinctSuiteIds = Array.from(new Set(suiteIds));
  const response = await Promise.all(distinctSuiteIds.map(async (suiteId) => await getSections(suiteId)));
  const flatResponse = response.flatMap((section) => section);
  return flatResponse.map((section) => ({ label: section.name, value: section.id }));
};

export async function loadTestCasesHandler(path: string): Promise<{
  testCases: TestCase[];
  options: TestCaseOptions;
}> {
  const testCases = await readTestCases(path);
  const suiteOptions = await getSuiteOptions();
  const sectionOptions = await getSectionOptions(testCases);
  const testCaseOptions = readTestCaseOptionsSettings();

  return {
    testCases,
    options: {
      suite_id: suiteOptions,
      section_id: sectionOptions,
      ...testCaseOptions,
    },
  };
}
