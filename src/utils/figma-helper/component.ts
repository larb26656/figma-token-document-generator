export function findComponent(
  componentName: string
): [string, ComponentNode[]] {
  const node = figma.root.findOne(
    (node) =>
      (node.type === "COMPONENT" || node.type === "COMPONENT_SET") &&
      node.name === componentName
  ) as PageNode | SceneNode;

  if (node.type === "COMPONENT") {
    const component = node as ComponentNode;
    return [component.name, [component]];
  } else if (node.type === "COMPONENT_SET") {
    const componentSet = node as ComponentSetNode;
    return [componentSet.name, componentSet.children as ComponentNode[]];
  }
}

export function sortComponentSetByAxis(
  componentSet: ComponentNode[]
): ComponentNode[] {
  return Array.from(componentSet).sort((a, b) => {
    if (a.y !== b.y) {
      return a.y - b.y;
    }

    return a.x - b.x;
  });
}

export function findColumnFromComponentSet(
  componentSet: ComponentNode[]
): number {
  if (!componentSet.length) {
    return 0;
  }

  let column = 0;
  let currentY = componentSet[0].y;

  for (let i = 0; i < componentSet.length; i++) {
    let component = componentSet[i];

    if (currentY !== component.y) {
      return column;
    }

    column++;
  }

  return column;
}
