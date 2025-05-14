import { createContext } from "react";
import { LoadTestCasesMessageData } from "../../../shared/definitions/message.definitions";

type Context = LoadTestCasesMessageData & {
  isLoading?: boolean;
  onUpdateTestCase?: (index: number, key: string, value: string) => void;
  onSaveTestCases?: () => void;
};

export const TestCasesContext = createContext<Context>({});
