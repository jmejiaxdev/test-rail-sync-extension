export type TestCase = {
  id?: number;
  title?: string;
  section_id?: number;
  suite_id?: number;
  template_id?: number;
  type_id?: number;
  priority_id?: number;
  refs?: string;
  milestone_id?: string;
  custom_manual_vs_automated?: number;
  custom_manual_automated?: number;
  custom_automation_tool_type?: number;
  custom_test_level?: number;
  is_deleted?: number;
}

export type TestCaseOption = {
  label?: string;
  value?: number;
};

export type TestCaseOptions = {
  section_id?: TestCaseOption[],
  suite_id?: TestCaseOption[],
  template_id?: TestCaseOption[],
  type_id?: TestCaseOption[],
  priority_id?: TestCaseOption[],
  custom_manual_vs_automated?: TestCaseOption[],
  custom_manual_automated?: TestCaseOption[],
  custom_automation_tool_type?: TestCaseOption[],
  custom_test_level?: TestCaseOption[],
};

