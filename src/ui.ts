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
  const tokenResolverSelect = document.getElementById(
    "token-resolver-input"
  ) as HTMLSelectElement;

  const prefix = prefixInput.value;
  const tokenResolver = tokenResolverSelect.value;

  BackendConnector.excuteGenerate({
    prefix: prefix,
    tokenResolve: tokenResolver as "token-studio" | "kebeb-case",
  });
};

function showLoader(show: boolean) {
  const loaderOverlay = document.getElementById("overlay");
  loaderOverlay.hidden = !show;
}
