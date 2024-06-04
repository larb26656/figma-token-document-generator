import { Setting } from "./model";

let _setting: Setting = {
  prefix: "",
  tokenTransformation: "token-studio",
};

export function getSetting() {
  return _setting;
}

export function updateSetting(setting: Setting) {
  _setting = setting;
}
