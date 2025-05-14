import { useEffect, useState } from "react";
import { usePostMessage } from "../usePostMessage/usePostMessage.hook";
import { LoadTestCasesMessageData } from "../../../shared/definitions/message.definitions";
import { TestCase, TestCaseOptions } from "../../../shared/definitions/testCase.definitions";

export function useTestCases() {
  const [postMessage, onPostMessage] = usePostMessage();
  const [testCases, setTestCases] = useState<TestCase[] | undefined>();
  const [options, setOptions] = useState<TestCaseOptions | undefined>();

  useEffect(() => {
    onPostMessage({ type: "init" });
  }, []);

  useEffect(() => {
    if (postMessage?.type === "load") {
      const { testCases = [], options = {} } = postMessage.data as LoadTestCasesMessageData;
      setTestCases(testCases);
      setOptions(options);
    }
  }, [postMessage]);

  const isLoading = testCases === undefined || options === undefined;

  const handleUpdateTestCase = (id: number, key: string, value: number | string) => {
    if (testCases) {
      setTestCases((prevState) => {
        return (prevState || []).map((testCase) => {
          return testCase.id === id ? { ...testCase, [key]: value } : testCase;
        });
      });
    }
  };

  const handleSaveTestCases = () => {
    onPostMessage({ type: "save", data: testCases });
  };

  return {
    testCases,
    options,
    isLoading,
    onUpdateTestCase: handleUpdateTestCase,
    onSaveTestCases: handleSaveTestCases,
  };
}
