import React, { JSX, PropsWithChildren } from "react";
import { WebviewContext } from "./webview.definitions";
import { useWebview } from "../../hooks/useWebview/useWebview.hook";

export function WebviewProvider(props: PropsWithChildren): JSX.Element {
  const value = useWebview();
  return <WebviewContext.Provider value={value}>{props.children}</WebviewContext.Provider>;
}
