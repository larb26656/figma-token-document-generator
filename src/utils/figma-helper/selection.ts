export function getCurrentSelection(): SceneNode {
  const selection = figma.currentPage.selection;
  return selection.length ? selection[0] : null;
}
