import { getTokenFromSharedPluginData } from "./shared-plugin-data";
import { getTokenFromShadowEffect, getTokenFromTextStyle } from "./style";
import { getTokenFromVariable } from "./variable";

const tokenOrder: string[] = [
  "sizing",
  "minWidth",
  "minHeight",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "itemSpacing",
  "fill",
  "borderColor",
  "borderRadius",
  "borderRadiusTopLeft",
  "borderRadiusTopRight",
  "borderRadiusBottomRight",
  "borderRadiusBottomLeft",
  "borderWidth",
  "boxShadow",
  "typography",
  "composition",
];

function sortTokenKeys(obj) {
  const sortedKeys = Object.keys(obj).sort(
    (a, b) => tokenOrder.indexOf(a) - tokenOrder.indexOf(b)
  );

  const sortedObj = {};
  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }
  return sortedObj;
}

export async function collectTokenUsages(
  node: SceneNode
): Promise<Record<string, string>> {
  const tokenFromPlugin = getTokenFromSharedPluginData(node);
  const tokenFromVar = await getTokenFromVariable(node);
  const tokenFromTextStyle = getTokenFromTextStyle(node as TextNode);
  const tokenFromShadowEffect = getTokenFromShadowEffect(
    node as DefaultShapeMixin
  );

  const tokenDetails = {
    ...tokenFromPlugin,
    ...tokenFromVar,
    ...tokenFromTextStyle,
    ...tokenFromShadowEffect,
  };

  return sortTokenKeys(tokenDetails);
}
