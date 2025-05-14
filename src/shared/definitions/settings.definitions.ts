import { TestCase, TestCaseOptions } from "./testCase.definitions";

// Package.json
// Path: contributes.configuration.properties
export const CONFIG_ROOT = "testRailSync";

export const CONFIG_TEST_CASE_PREFIX = `${CONFIG_ROOT}.testCase.`;

export type ApiSettings = {
  organizationUrl: string;
  username: string;
  key: string;
  projectId: string;
};

export type TestCaseSettings = TestCase;

export type TestCaseOptionsSettings = TestCaseOptions;
