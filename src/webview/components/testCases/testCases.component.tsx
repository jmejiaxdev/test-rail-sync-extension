import { Box, Button, Typography } from "@mui/material";
import React, { JSX } from "react";
import { TestCasesTable } from "../testCasesTable/testCasesTable.component";
import { Loading } from "../loading/loading.component";
import { useTestCasesContext } from "../../contexts/testCases/testCases.hook";

export function TestCases(): JSX.Element {
  const { isLoading, onSaveTestCases } = useTestCasesContext();

  if (isLoading) return <Loading />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box>
        <Typography variant="body2">Synchronize your test cases file with TestRail</Typography>
      </Box>
      <Box>
        <TestCasesTable />
      </Box>
      <Box sx={{ display: "flex", height: 50, justifyContent: "flex-end" }}>
        <Button color="secondary" variant="contained" onClick={onSaveTestCases}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
