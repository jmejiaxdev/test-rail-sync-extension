import { TestCaseOptions } from "../../../shared/definitions/testCase.definitions";

export const TEST_CASES_TABLE_OPTIONS: (keyof TestCaseOptions)[] = [
  "suite_id",
  "section_id",
  "template_id",
  "type_id",
  "priority_id",
  "custom_manual_vs_automated",
  "custom_automation_tool_type",
  "custom_manual_automated",
  "custom_test_level",
];

export const TEST_CASES_TABLE_COLUMNS = [
  "id",
  "title",
  ...TEST_CASES_TABLE_OPTIONS,
  "refs",
  "milestone_id",
  "is_deleted",
];
