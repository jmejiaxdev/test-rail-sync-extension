import React, { JSX, PropsWithChildren, useEffect, useState } from "react";
import { usePostMessage } from "../../hooks/usePostMessage/usePostMessage.hook";
import { SyncTestCasesLoadMessageData } from "../../../shared/definitions/message.definitions";
import {
  TestCase,
  TestCaseOptions,
} from "../../../shared/definitions/testCase.definitions";
import { TestCasesContext } from "./testCases.definitions";

export function TestCasesProvider(props: PropsWithChildren): JSX.Element {
  const [postMessage, onPostMessage] = usePostMessage();

  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [options, setOptions] = useState<TestCaseOptions>({});

  useEffect(() => {
    onPostMessage({ type: "sync-init" });
  }, []);

  useEffect(() => {
    if (postMessage?.type !== "sync-load") return;
    console.log("postMessage", postMessage);
    const { testCases = [], options = {} } = postMessage.data as SyncTestCasesLoadMessageData;
    setTestCases(testCases);
    setOptions(options);
  }, [postMessage]);

  const isLoading = testCases === undefined || options === undefined;

  const handleUpdateTestCase = (id: number, key: string, value: number | string) => {
    if (!testCases) return;
    
    setTestCases((prevState) => {
      return prevState.map((testCase) => {
        return testCase.id === id ? { ...testCase, [key]: value } : testCase;
      });
    });
  };

  const handleSaveTestCases = () => {
    onPostMessage({
      type: "sync-save",
      data: testCases,
    });
  };

  return (
    <TestCasesContext.Provider
      value={{
        testCases,
        options,
        isLoading,
        onUpdateTestCase: handleUpdateTestCase,
        onSaveTestCases: handleSaveTestCases,
      }}
    >
      {props.children}
    </TestCasesContext.Provider>
  );
}
