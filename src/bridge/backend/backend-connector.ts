import { Setting } from "../../task/generate/setting";
import { BackendConnectorEvent } from "./backend-connector.event";

export namespace BackendConnector {
  export function excuteGenerate(setting: Setting) {
    parent.postMessage(
      {
        pluginMessage: {
          type: BackendConnectorEvent.excuteGenerate,
          data: setting,
        },
      },
      "*"
    );
  }
}
