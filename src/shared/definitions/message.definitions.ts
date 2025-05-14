import { TestCase, TestCaseOptions } from "./testCase.definitions";

export type LoadTestCasesMessageData = {
  testCases?: TestCase[];
  options?: TestCaseOptions;
};
