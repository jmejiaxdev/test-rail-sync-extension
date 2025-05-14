import React, { JSX } from "react";
import { TestCases } from "../testCases/testCases.component";
import { useWebviewContext } from "../../contexts/webview/webview.hook";
import { TestCasesProvider } from "../../contexts/testCases/testCases.provider";

export function Router(): JSX.Element {
  const { route } = useWebviewContext();
  
  return (
    <>
      {route === "webview.sync" && (
        <TestCasesProvider>
          <TestCases />
        </TestCasesProvider>
      )}
    </>
  );
}
