// import React, { ChangeEvent, JSX } from "react";
// import {
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableBody,
//   TextField,
//   FormControl,
//   TextareaAutosize,
//   TableCell,
//   Typography,
// } from "@mui/material";
// import { TestCaseSelect } from "../testCaseSelect/testCaseSelect.component";
// import { useTestCasesContext } from "../../contexts/testCases/testCases.hook";
// import { TEST_CASES_TABLE_COLUMNS, TEST_CASES_TABLE_OPTIONS } from "./testCaseFields.definitions";

// export function TestCaseFields(): JSX.Element {
//   const { testCases = [], onUpdateTestCase } = useTestCasesContext();

//   const handleChange =
//     (id?: number, field?: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       if (id && field) {
//         onUpdateTestCase?.(id, field, event.target.value);
//       }
//     };

//   // TODO: add column toggle
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

//   );
// }
