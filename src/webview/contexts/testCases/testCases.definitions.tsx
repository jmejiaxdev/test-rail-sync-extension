import { createContext } from "react";
import { SyncTestCasesLoadMessageData } from "../../../shared/definitions/message.definitions";

type Context = SyncTestCasesLoadMessageData & {
  isLoading?: boolean;
  onUpdateTestCase?: (index: number, key: string, value: string) => void;
  onSaveTestCases?: () => void;
};

export const TestCasesContext = createContext<Context>({});
