import { UIConnectorEvent } from "./ui-connector.event";

export namespace UIConnector {
  export function finishTask() {
    figma.ui.postMessage({
      type: UIConnectorEvent.finishTask,
    });
  }
}
