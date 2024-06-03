import {
  getCurrentSelection,
  sortComponentSetByAxis,
} from "../../utils/figma-helper";
import { createDoc } from "./doc";
import { Setting, updateSetting } from "./setting";

export namespace GenerateTask {
  export async function generate(setting: Setting) {
    updateSetting(setting);

    const currentSelection = getCurrentSelection();
    if (!currentSelection) throw new Error("No selection");

    if (
      currentSelection.type !== "COMPONENT" &&
      currentSelection.type !== "COMPONENT_SET"
    ) {
      throw new Error("Please select component or component set");
    }

    let componentName = "";
    let components = [];

    if (currentSelection.type === "COMPONENT") {
      const component = currentSelection as ComponentNode;
      componentName = component.name;
      components = [component];
    } else {
      const componentSet = currentSelection as ComponentSetNode;
      componentName = componentSet.name;
      const componentWithSort = sortComponentSetByAxis(
        componentSet.children as ComponentNode[]
      );
      components = componentWithSort;
    }

    await createDoc(componentName, components);
  }
}
