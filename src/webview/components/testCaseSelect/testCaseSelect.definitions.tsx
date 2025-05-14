import type { TestCase, TestCaseOptions } from "../../../shared/definitions/testCase.definitions";

export type TestCaseSelectProps = {
  field?: keyof TestCaseOptions;
  testCase?: TestCase;
};
  