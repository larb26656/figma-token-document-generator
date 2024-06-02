import {
  createFrame,
  createText,
  setAutoLayout,
} from "../../../utils/figma-helper";
import { createAllTokenDocFrame } from "./token-doc";

export async function createComponentDocFrame(component: ComponentNode) {
  const name = component.name;

  const docFrame = createFrame(name);
  setAutoLayout(docFrame);

  const docTitleText = createText(name);
  docFrame.appendChild(docTitleText);

  const contentFrame = createFrame("Content");
  setAutoLayout(contentFrame, "HORIZONTAL");

  const componentFrame = createFrame("Component");
  setAutoLayout(componentFrame, "HORIZONTAL");

  const instance = component.createInstance();
  componentFrame.appendChild(instance);

  const detailFrame = createFrame("Detail");
  setAutoLayout(detailFrame);

  const tokenFrame = createAllTokenDocFrame(instance);
  detailFrame.appendChild(tokenFrame);
  contentFrame.appendChild(componentFrame);
  contentFrame.appendChild(detailFrame);
  docFrame.appendChild(contentFrame);

  return docFrame;
}
