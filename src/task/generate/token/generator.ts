import { TokenDetail } from "./model";
import { resolveToken } from "./resolver";

const tokenBlackList = ["version", "hash", ""];

export function collectTokenUsages(node: BaseNode): TokenDetail[] {
  const tokenUsageString = node.getSharedPluginDataKeys("tokens");
  const tokenUsages = String(tokenUsageString).split(",");

  const tokenDetails: TokenDetail[] = [];

  for (const tokenUsage of tokenUsages) {
    if (tokenBlackList.includes(tokenUsage)) {
      continue;
    }

    const token = node.getSharedPluginData("tokens", tokenUsage);

    tokenDetails.push({
      usage: tokenUsage,
      token: resolveToken(token),
    });
  }

  return tokenDetails;
}
