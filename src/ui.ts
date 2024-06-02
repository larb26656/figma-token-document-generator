import { BackendConnector } from "./bridge/backend/backend-connector";
import "./style/base.css";

function setEnableExportBtn(enable: boolean) {
  const btn = document.getElementById("generate-btn") as HTMLInputElement;

  btn.disabled = !enable;
}

// binding events
document.getElementById("generate-btn").onclick = () => {
  BackendConnector.excuteGenerate();
};
