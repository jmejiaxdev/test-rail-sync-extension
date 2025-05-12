import { addCase } from "../../api/testRail/testCases.api";
import { TestCase } from "../../../shared/definitions/testCase.definitions";

export async function syncSave(testCases: TestCase[]): Promise<void> {
  const promises = testCases.map((testCase) => addCase(testCase));
  await Promise.all(promises);
}
