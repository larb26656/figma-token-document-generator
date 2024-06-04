import { resolveToken, transformVariableToToken } from "../transform";

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

export async function getTokenFromVariable(
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
