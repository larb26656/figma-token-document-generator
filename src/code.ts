import { BackendConnectorEvent } from "./bridge/backend/backend-connector.event";
import { GenerateTask } from "./task/generate";

figma.showUI(__html__, { width: 256, height: 256 });

async function setupFont() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "JetBrains Mono", style: "Regular" });
}

figma.ui.onmessage = async (msg) => {
  await setupFont();
  try {
    if (msg.type === BackendConnectorEvent.excuteGenerate) {
      await GenerateTask.generate();
    }
  } catch (err) {
    console.error(err);
    figma.notify(`Error cause ${err.message}`);
  }
};
