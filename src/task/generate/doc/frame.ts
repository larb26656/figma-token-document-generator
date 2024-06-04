import {
  createFrame,
  createText,
  findColumnFromComponentSet,
  setAutoLayout,
} from "../../../utils/figma-helper";
import { createComponentDocFrame } from "./component-doc";

export function createMainFrame(name: string): FrameNode {
  const frame = createFrame(`${name} Doc`);
  setAutoLayout(frame);

  const titleText = createText(name);
  frame.appendChild(titleText);

  return frame;
}

export function createRowFrame(row: number): FrameNode {
  const frame = createFrame(`Row ${row}`);
  setAutoLayout(frame, "HORIZONTAL");

  return frame;
}

export async function createDoc(
  componentName: string,
  componentSet: ComponentNode[]
) {
  // create frame
  const mainFrame = createMainFrame(componentName);
  const columns = findColumnFromComponentSet(componentSet);

  let row = 1;
  let currentColumns = 1;
  let currentRowFrame = createRowFrame(row);
  mainFrame.appendChild(currentRowFrame);

  for (const component of componentSet) {
    if (currentColumns > columns) {
      currentColumns = 1;
      row++;

      currentRowFrame = createRowFrame(row);
      mainFrame.appendChild(currentRowFrame);
    }

    const docFrame = await createComponentDocFrame(component);
    currentRowFrame.appendChild(docFrame);

    currentColumns++;
  }
}
