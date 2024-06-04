import { resolveToken, transformVariableToToken } from "./resolver";

const tokenBlackList = ["version", "hash", ""];

function getTokenFromSharedPluginData(node: SceneNode): Record<string, string> {
  const tokenDetails: Record<string, string> = {};

  const tokenUsageString = node.getSharedPluginDataKeys("tokens");
  const tokenUsages = String(tokenUsageString).split(",");

  for (const tokenUsage of tokenUsages) {
    if (tokenBlackList.includes(tokenUsage)) {
      continue;
    }

    const token = node.getSharedPluginData("tokens", tokenUsage);

    tokenDetails[tokenUsage] = resolveToken(token);
  }

  return tokenDetails;
}

// TODO should move another layer...
const tokenVariableCache: Record<string, string> = {};

async function getVariableToken(variableId: string): Promise<string> {
  const cache = tokenVariableCache[variableId];

  if (cache) {
    return cache;
  }

  const varible = await figma.variables.getVariableByIdAsync(variableId);

  if (!varible) {
    return null;
  }

  return varible.name;
}

const variableToTokenUsageDictionary = {
  bottomLeftRadius: "borderRadiusBottomLeft",
  bottomRightRadius: "borderRadiusBottomRight",
  topLeftRadius: "borderRadiusTopLeft",
  topRightRadius: "borderRadiusTopRight",
};

async function getTokenFromVariable(
  node: SceneNode
): Promise<Record<string, string>> {
  const tokenDetails: Record<string, string> = {};
  const variableUsages = node.boundVariables;

  for (const key of Object.keys(variableUsages)) {
    const variableUsage = variableUsages[key];
    const variable = await getVariableToken(variableUsage.id);

    if (!variable) {
      continue;
    }

    const token = transformVariableToToken(variable);
    const tokenUsage = variableToTokenUsageDictionary[key];

    tokenDetails[tokenUsage ? tokenUsage : key] = resolveToken(token);
  }

  return tokenDetails;
}

// TODO should move another layer...
const textStyleCache: Record<string, string> = {};

function getTextStyleToken(textStyleId: string): string {
  const cache = textStyleCache[textStyleId];

  if (cache) {
    return cache;
  }

  const style = figma.getStyleById(textStyleId);

  if (!style) {
    return null;
  }

  return style.name;
}

function getTokenFromTextStyle(node: TextNode): Record<string, string> {
  const tokenDetails: Record<string, string> = {};
  const textStyleId = node.textStyleId as string;

  if (!textStyleId) {
    return {};
  }

  const textStyle = getTextStyleToken(textStyleId);

  if (!textStyle) {
    return {};
  }

  const token = transformVariableToToken(textStyle);
  tokenDetails["typography"] = resolveToken(token);

  return tokenDetails;
}

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

  const tokenDetails = {
    ...tokenFromPlugin,
    ...tokenFromVar,
    ...tokenFromTextStyle,
  };

  return sortTokenKeys(tokenDetails);
}
