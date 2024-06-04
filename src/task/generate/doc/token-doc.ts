import {
  createFrame,
  createText,
  setAutoLayout,
} from "../../../utils/figma-helper";
import { TokenDetail, collectTokenUsages } from "../token";

export function createTokenDocFrame(
  node: BaseNode,
  tokenUsages: Record<string, string>
) {
  const frame = createFrame("Codebox");
  frame.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
  setAutoLayout(frame, "HORIZONTAL");

  let tokenDocText = "";
  tokenDocText += node.name + "\n";
  tokenDocText += "\n";
  tokenDocText += Object.keys(tokenUsages)
    .map((key) => `${key} : ${tokenUsages[key]}`)
    .join("\n");

  const codeText = createText(tokenDocText, "JetBrains Mono", "Regular");
  codeText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.appendChild(codeText);

  return frame;
}

export async function appendDeepTokenDocFrame(
  node: ChildrenMixin,
  tokenDocFrames: FrameNode[]
): Promise<void> {
  const tokenUsages = await collectTokenUsages(node as SceneNode);

  if (Object.keys(tokenUsages).length) {
    const frame = createTokenDocFrame(node as BaseNode, tokenUsages);
    tokenDocFrames.push(frame);
  }

  if (!node.children) {
    return;
  }

  for (const child of node.children) {
    await appendDeepTokenDocFrame(child as ChildrenMixin, tokenDocFrames);
  }
}

export async function createAllTokenDocFrame(instance: InstanceNode) {
  const frame = createFrame(`${instance.name} doc`);
  setAutoLayout(frame);

  const tokenFrames: FrameNode[] = [];
  await appendDeepTokenDocFrame(instance, tokenFrames);

  for (const tokenFrame of tokenFrames) {
    frame.appendChild(tokenFrame);
  }

  return frame;
}
