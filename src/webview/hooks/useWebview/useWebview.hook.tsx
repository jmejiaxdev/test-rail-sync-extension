import { useEffect, useState } from "react";
import { ExtensionRoute } from "../../../shared/definitions/extension.definitions";

export function useWebview() {
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

  return {
    route,
    onRouteChange: handleRouteChange,
  };
}
