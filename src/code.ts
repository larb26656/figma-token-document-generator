import { BackendConnectorEvent } from "./bridge/backend/backend-connector.event";
import { UIConnector } from "./bridge/ui/ui-connector";
import { GenerateTask } from "./task/generate";
import { Setting } from "./task/generate/setting";

figma.showUI(__html__, { width: 256, height: 300 });

async function setupFont() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "JetBrains Mono", style: "Regular" });
}

figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === BackendConnectorEvent.excuteGenerate) {
      await setupFont();
      await GenerateTask.generate(msg.data as Setting);
    }
  } catch (err) {
    figma.notify(`Error cause ${err.message}`);
  } finally {
    UIConnector.finishTask();
  }
};
