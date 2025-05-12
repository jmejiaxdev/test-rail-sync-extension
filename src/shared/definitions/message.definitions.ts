import { TestCase, TestCaseOptions } from "./testCase.definitions";

export type SyncTestCasesLoadMessageData = {
  testCases?: TestCase[];
  options?: TestCaseOptions;
};