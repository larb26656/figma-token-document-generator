import { resolveToken } from "../transform";

const tokenBlackList = ["version", "hash", ""];

export function getTokenFromSharedPluginData(
  node: SceneNode
): Record<string, string> {
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
