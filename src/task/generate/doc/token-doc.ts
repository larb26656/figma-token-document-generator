import {
  createFrame,
  createText,
  setAutoLayout,
} from "../../../utils/figma-helper";
import { collectTokenUsages } from "../token/collector";

function createTokenRow(usage: string, token: string): FrameNode {
  const frame = createFrame("row");
  frame.fills = [];
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";
  frame.itemSpacing = 10;

  const usageText = createText(`${usage}:`, "JetBrains Mono", "Regular");
  usageText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

  frame.appendChild(usageText);

  const tokenText = createText(token, "JetBrains Mono", "Regular");
  tokenText.fills = [
    {
      type: "SOLID",
      color: {
        r: 187 / 255,
        g: 154 / 255,
        b: 247 / 255,
      },
    },
  ];

  frame.appendChild(tokenText);

  return frame;
}

export function createTokenDocFrame(
  node: BaseNode,
  tokenUsages: Record<string, string>
) {
  const frame = createFrame("Codebox");
  frame.fills = [
    {
      type: "SOLID",
      color: {
        r: 36 / 255,
        g: 40 / 255,
        b: 59 / 255,
      },
    },
  ];
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";
  frame.paddingLeft = 10;
  frame.paddingRight = 10;
  frame.paddingTop = 10;
  frame.paddingBottom = 10;
  frame.cornerRadius = 4;

  const nodeNameText = createText(`${node.name}:`, "JetBrains Mono", "Regular");
  nodeNameText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.appendChild(nodeNameText);

  const blank = createText(``);
  frame.appendChild(blank);
  frame.appendChild(blank);

  Object.keys(tokenUsages).forEach((key) => {
    const row = createTokenRow(key, tokenUsages[key]);
    frame.appendChild(row);
  });

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
