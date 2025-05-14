import React, { JSX, PropsWithChildren } from "react";
import { TestCasesContext } from "./testCases.definitions";
import { useTestCases } from "../../hooks/useTestCases/useTestCases.hook";

export function TestCasesProvider(props: PropsWithChildren): JSX.Element {
  const value = useTestCases();
  return <TestCasesContext.Provider value={value}>{props.children}</TestCasesContext.Provider>;
}
