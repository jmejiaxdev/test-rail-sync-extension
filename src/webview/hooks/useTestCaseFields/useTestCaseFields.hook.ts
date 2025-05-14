import { useEffect, useState } from "react";
import { ExtensionMessage } from "../../../shared/definitions/extension.definitions";
import type { PostMessage } from "./useTestCaseFields.definitions";

export function useTestCaseFields(): PostMessage {
  const [postMessage, setMessage] = useState<ExtensionMessage | null>(null);

  useEffect(() => {
    const handleDidReceiveMessage = (event: MessageEvent) => {
      const message = event.data as ExtensionMessage;
      console.log("Message received from webview:", message);
      setMessage(message);
    };

    window.addEventListener("message", handleDidReceiveMessage);

    return () => {
      window.removeEventListener("message", handleDidReceiveMessage);
    };
  }, []);

  const handlePostMessage = (message: ExtensionMessage) => {
    window.vscode.postMessage(message);
  };

  return [postMessage, handlePostMessage];
}
