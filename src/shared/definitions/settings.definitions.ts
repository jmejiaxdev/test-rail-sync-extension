import { TestCase, TestCaseOptions } from "./testCase.definitions";

export const CONFIGURATION = "testRailSync";
export const CONFIGURATION_TEST_CASE = `${CONFIGURATION}.testCase.`;

export type ApiSettings = {
  organizationUrl?: string;
  username?: string;
  key?: string;
  projectId?: string;
};

export type TestCaseSettings = TestCase;

export type TestCaseOptionsSettings = TestCaseOptions;
