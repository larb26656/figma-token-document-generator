export function createFrame(layerName: string) {
  const frame = figma.createFrame();
  frame.name = layerName;
  return frame;
}

export function setAutoLayout(
  node: FrameNode,
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL" = "VERTICAL",
  itemSpacing = 10,
  horizontalSizingMode: "FIXED" | "AUTO" = "AUTO",
  verticalSizingMode: "FIXED" | "AUTO" = "AUTO",
  horizontalAlignItems: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN" = "MIN",
  verticalAlignItems: "MIN" | "MAX" | "CENTER" | "BASELINE" = "MIN",
  paddingLeft = 10,
  paddingRight = 10,
  paddingTop = 10,
  paddingBottom = 10
) {
  node.layoutMode = layoutMode;
  node.primaryAxisSizingMode = horizontalSizingMode;
  node.counterAxisSizingMode = verticalSizingMode;
  node.primaryAxisAlignItems = horizontalAlignItems;
  node.counterAxisAlignItems = verticalAlignItems;
  node.paddingLeft = paddingLeft;
  node.paddingRight = paddingRight;
  node.paddingTop = paddingTop;
  node.paddingBottom = paddingBottom;
  node.itemSpacing = itemSpacing;
}
