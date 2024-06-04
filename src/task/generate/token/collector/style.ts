import { resolveToken, transformVariableToToken } from "../transform";

// TODO should move another layer...
const styleCache: Record<string, string> = {};

function getStyleToken(styleId: string): string {
  const cache = styleCache[styleId];

  if (cache) {
    return cache;
  }

  const style = figma.getStyleById(styleId);

  if (!style) {
    return null;
  }

  return style.name;
}

export function getTokenFromTextStyle(node: TextNode): Record<string, string> {
  const tokenDetails: Record<string, string> = {};
  const textStyleId = node.textStyleId as string;

  if (!textStyleId) {
    return {};
  }

  const style = getStyleToken(textStyleId);

  if (!style) {
    return {};
  }

  const token = transformVariableToToken(style);
  tokenDetails["typography"] = resolveToken(token);

  return tokenDetails;
}

export function getTokenFromShadowEffect(
  node: DefaultShapeMixin
): Record<string, string> {
  const tokenDetails: Record<string, string> = {};
  const effectStyleId = node.effectStyleId;

  if (!effectStyleId) {
    return {};
  }

  const style = getStyleToken(effectStyleId);

  if (!style) {
    return {};
  }

  const token = transformVariableToToken(style);
  tokenDetails["boxShadow"] = resolveToken(token);

  return tokenDetails;
}
