import {
  createFrame,
  createText,
  setAutoLayout,
} from "../../../utils/figma-helper";
import { TokenDetail, collectTokenUsages } from "../token";

export function createTokenDocFrame(
  node: BaseNode,
  tokenUsages: TokenDetail[]
) {
  const frame = createFrame("Codebox");
  frame.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
  setAutoLayout(frame, "HORIZONTAL");

  let tokenDocText = "";
  tokenDocText += node.name + "\n";
  tokenDocText += "\n";
  tokenDocText += tokenUsages
    .map((tokenUsage) => `${tokenUsage.usage} : ${tokenUsage.token}`)
    .join("\n");

  const codeText = createText(tokenDocText, "JetBrains Mono", "Regular");
  codeText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.appendChild(codeText);

  return frame;
}

export function appendDeepTokenDocFrame(
  node: ChildrenMixin,
  tokenDocFrames: FrameNode[]
): void {
  const tokenUsages = collectTokenUsages(node as BaseNode);

  if (tokenUsages.length) {
    const frame = createTokenDocFrame(node as BaseNode, tokenUsages);
    tokenDocFrames.push(frame);
  }

  if (!node.children) {
    return;
  }

  for (const child of node.children) {
    appendDeepTokenDocFrame(child as ChildrenMixin, tokenDocFrames);
  }
}

export function createAllTokenDocFrame(instance: InstanceNode) {
  const frame = createFrame(`${instance.name} doc`);
  setAutoLayout(frame);

  const tokenFrames: FrameNode[] = [];
  appendDeepTokenDocFrame(instance, tokenFrames);

  for (const tokenFrame of tokenFrames) {
    frame.appendChild(tokenFrame);
  }

  return frame;
}
