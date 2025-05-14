import React, { ChangeEvent, JSX } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  FormControl,
  TextareaAutosize,
  TableCell,
  Typography,
} from "@mui/material";
import { TestCaseSelect } from "../testCaseSelect/testCaseSelect.component";
import { useTestCasesContext } from "../../contexts/testCases/testCases.hook";
import { TEST_CASES_TABLE_COLUMNS, TEST_CASES_TABLE_OPTIONS } from "./testCasesTable.definitions";

export function TestCasesTable(): JSX.Element {
  const { testCases = [], onUpdateTestCase } = useTestCasesContext();

  const handleChange =
    (id?: number, field?: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (id && field) {
        onUpdateTestCase?.(id, field, event.target.value);
      }
    };

  // TODO: add column toggle
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table aria-label="sticky table" stickyHeader>
        <TableHead>
          <TableRow>
            {TEST_CASES_TABLE_COLUMNS.map((option) => (
              <TableCell key={option} sx={{ minWidth: 175 }}>
                <Typography fontWeight={900} sx={{ textTransform: "uppercase" }} variant="body2">
                  {option}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {testCases.map((testCase) => (
            <TableRow key={testCase.id} hover tabIndex={-1}>
              <TableCell>
                <Typography variant="body2">{testCase.id}</Typography>
              </TableCell>
              <TableCell>
                <FormControl sx={{ width: 475 }} variant="outlined">
                  <TextareaAutosize value={testCase.title} onChange={handleChange(testCase.id, "title")} />
                </FormControl>
              </TableCell>
              {TEST_CASES_TABLE_OPTIONS.map((option) => (
                <TableCell key={option}>
                  <FormControl variant="outlined" fullWidth>
                    <TestCaseSelect field={option} testCase={testCase} />
                  </FormControl>
                </TableCell>
              ))}
              <TableCell>
                <FormControl sx={{ width: "max-content" }} variant="outlined" fullWidth>
                  <TextField value={testCase.refs} onChange={handleChange(testCase.id, "refs")} />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl sx={{ width: "max-content" }} variant="outlined" fullWidth>
                  <TextField value={testCase.milestone_id} onChange={handleChange(testCase.id, "milestone_id")} />
                </FormControl>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{testCase.is_deleted ? "Yes" : "No"}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
