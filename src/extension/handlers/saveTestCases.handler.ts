import { addCase } from "../clients/testRail.client";
import { TestCase } from "../../shared/definitions/testCase.definitions";

export async function saveTestCasesHandler(testCases: TestCase[]): Promise<void> {
  const promises = testCases.map((testCase) => addCase(testCase));
  await Promise.all(promises);
}
