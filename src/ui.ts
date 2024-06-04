import { BackendConnector } from "./bridge/backend/backend-connector";
import "./style/figma-plugin-ds.css";
import "./style/base.css";
import "./style/utils.css";
import { UIConnectorEvent } from "./bridge/ui/ui-connector.event";

window.onmessage = async (event) => {
  const eventData = event.data.pluginMessage;

  if (eventData?.type === UIConnectorEvent.finishTask) {
    showLoader(false);
  }
};

document.getElementById("generate-button").onclick = () => {
  showLoader(true);

  const prefixInput = document.getElementById(
    "prefix-input"
  ) as HTMLInputElement;
  const tokenTransformationSelect = document.getElementById(
    "token-transformation-input"
  ) as HTMLSelectElement;

  const prefix = prefixInput.value;
  const tokenTransformation = tokenTransformationSelect.value;

  BackendConnector.excuteGenerate({
    prefix: prefix,
    tokenTransformation: tokenTransformation as "token-studio" | "kebeb-case",
  });
};

function showLoader(show: boolean) {
  const loaderOverlay = document.getElementById("overlay");
  loaderOverlay.hidden = !show;
}
