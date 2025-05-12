import { useContext } from "react";
import { WebviewContext } from "./webview.definitions";

export function useWebviewContext() {
  return useContext(WebviewContext);
}
