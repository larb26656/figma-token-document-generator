export function toKebabCase(str: string): string {
  return str
    .replace(/\./g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert hyphen between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Insert hyphen between consecutive uppercase letters followed by lowercase letter
    .toLowerCase();
}
