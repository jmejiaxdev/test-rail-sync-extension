import React, { JSX, PropsWithChildren, useEffect, useState } from "react";
import { ExtensionRoute } from "../../../shared/definitions/extension.definitions";
import { WebviewContext } from "./webview.definitions";

export function WebviewProvider(props: PropsWithChildren): JSX.Element {
  const [route, setRoute] = useState<ExtensionRoute>(window.route);

  const handleRouteChange = (newRoute: ExtensionRoute) => {
    if (newRoute !== route) {
      setRoute(newRoute);
    }
  };

  useEffect(() => {
    if (route && window.route) {
      setRoute(window.route);
    }
  }, [route]);

  return (
    <WebviewContext.Provider
      value={{
        route,
        onRouteChange: handleRouteChange,
      }}
    >
      {props.children}
    </WebviewContext.Provider>
  );
}
