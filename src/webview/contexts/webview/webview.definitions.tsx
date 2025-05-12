import { createContext } from "react";
import { ExtensionRoute } from "../../../shared/definitions/extension.definitions";

type Context = {
  route?: ExtensionRoute;
  onRouteChange?: (newRoute: ExtensionRoute) => void;
};

export const WebviewContext = createContext<Context>({});
