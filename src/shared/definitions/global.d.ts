import { ExtensionMessage, ExtensionRoute } from "./extension.definitions";

declare global {
  interface Window {
    route: ExtensionRoute;
    vscode: {
      postMessage: (message: ExtensionMessage) => void;
    };
  }
}

declare module "vscode" {
  interface Webview {
    postMessage(message: ExtensionMessage): Thenable<boolean>;
  }
}

export {};
