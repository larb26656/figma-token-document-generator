import { BackendConnectorEvent } from "./backend-connector.event";

export namespace BackendConnector {
  export function excuteGenerate() {
    parent.postMessage(
      { pluginMessage: { type: BackendConnectorEvent.excuteGenerate } },
      "*"
    );
  }
}
