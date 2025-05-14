import { ExtensionMessage } from "../../../shared/definitions/extension.definitions";

export type PostMessage = [ExtensionMessage | null, (message: ExtensionMessage) => void];
