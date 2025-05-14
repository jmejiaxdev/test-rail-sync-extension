import { useContext } from "react";
import { TestCasesContext } from "./testCases.definitions";

export function useTestCasesContext() {
  return useContext(TestCasesContext);
}
