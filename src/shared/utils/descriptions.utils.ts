import { TestCase } from "../definitions/testCase.definitions";

const regex = /(test|it)\s*\(\s*['"]\s*([0-9]*\s*:\s*)?(.*?)\s*['"]\s*,/g;

const formatId = (id: string): string => {
  return id.replace(":", "").trim();
};

export function readDescriptions(fileContent: string): Pick<TestCase, "id" | "title">[] {
  let match;
  const results = [];

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[2] ? Number(formatId(match[2])) : undefined;
    const title = match[3].trim();
    results.push({ id, title });
  }

  return results;
}

export function replaceDescriptions(fileContent: string, testCases: TestCase[]): string {
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[2];
    const title = match[3];

    if (id) {
      const testCase = testCases.find((testCase) => String(testCase.id) === formatId(id));

      if (testCase?.title && testCase.title !== title) {
        fileContent = fileContent.replace(title, testCase.title);
      }
    } else {
      const formattedTitle = match[3].trim();
      const testCase = testCases.find((testCase) => testCase.title === formattedTitle);

      if (testCase?.id) {
        fileContent = fileContent.replace(formattedTitle, `${testCase.id}: ${testCase.title}`);
      }
    }
  }

  return fileContent;
}
