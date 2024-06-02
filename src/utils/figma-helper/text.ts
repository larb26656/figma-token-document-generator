export function createText(
  characters: string,
  fontFamily = "Inter",
  fontStyle = "Regular",
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED" = "LEFT",
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM" = "CENTER",
  textDecoration: TextDecoration = "NONE",
  textCase: TextCase = "ORIGINAL",
  textAutoResize:
    | "NONE"
    | "WIDTH_AND_HEIGHT"
    | "HEIGHT"
    | "TRUNCATE" = "WIDTH_AND_HEIGHT"
) {
  const text = figma.createText();
  text.fontName = { family: fontFamily, style: fontStyle };
  text.textAlignHorizontal = textAlignHorizontal;
  text.textAlignVertical = textAlignVertical;
  text.textDecoration = textDecoration;
  text.textCase = textCase;
  text.textAutoResize = textAutoResize;
  text.characters = characters;
  return text;
}
