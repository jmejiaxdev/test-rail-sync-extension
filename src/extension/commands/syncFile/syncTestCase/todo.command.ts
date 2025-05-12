// const command = "get-test-case";

// export default function getEditorLine(editor: TextEditor): string {
//   const lineNumber = editor.selection.active.line;
//   const line = editor.document.lineAt(lineNumber).text;
//   console.log("getEditorLine line", line);
//   return line;
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const callback = (context: ExtensionContext): any => {
//   console.log(command);

//   return (uri: Uri): void => {
//     const editor = window.activeTextEditor;
//     if (!editor) throw new Error("VS Code editor not found");

//     const line = getEditorLine(editor);
//     const panel = createWebviewPanel(context, command, "Get test case");

//     const handleReceiveMessage = async (message: Message) => {
//       try {
//         const settings = getSettings(uri.fsPath);
//         if (!settings) throw createSettingsError();

//         const description = getDescriptions(line).pop();
//         if (!description || !description.title || !description.id) throw new Error("Test case description not found");

//         const testCase = await TestRailService.getTestCase(settings, description.id);
//         panel.webview.postMessage({ ...message, data: [testCase] });
//       } catch (error) {
//         showCommandError(error);
//       }
//     };

//     panel.webview.onDidReceiveMessage(handleReceiveMessage);
//   };
// };

// const GetTestCase = { command, callback };

// export default GetTestCase;
