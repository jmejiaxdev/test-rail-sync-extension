import React, { JSX } from "react";
import { Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";
import { TestCaseSelectProps } from "./testCaseSelect.definitions";
import { useTestCasesContext } from "../../contexts/testCases/testCases.hook";

export function TestCaseSelect(props: TestCaseSelectProps): JSX.Element {
  const { field, testCase } = props;

  const { options, onUpdateTestCase } = useTestCasesContext();

  const selectOptions = field && options ? options[field] : [];

  const handleChange = (event: SelectChangeEvent) => {
    if (testCase?.id && field) {
      onUpdateTestCase?.(testCase?.id, field, event.target.value);
    }
  };

  const value = (field && testCase && String(testCase?.[field])) || "";

  return (
    <Select defaultValue="Select an option" value={value} onChange={handleChange}>
      {(selectOptions || []).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Typography variant="body2">{option.label}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
}
