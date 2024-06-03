import { toKebabCase } from "../../../utils/case";
import { getSetting } from "../setting";

function normalizeToken(token: string): string {
  return token.replaceAll('"', "");
}

function changeTokenCase(token: string): string {
  const setting = getSetting();

  if (setting.tokenResolve === "kebeb-case") {
    return toKebabCase(token);
  } else if (setting.tokenResolve === "token-studio") {
    return token;
  }
}

export function resolveToken(token: string): string {
  const setting = getSetting();
  let newToken = normalizeToken(token);

  if (setting.prefix) {
    newToken = `${setting.prefix}${newToken}`;
  }

  newToken = changeTokenCase(newToken);

  return newToken;
}
