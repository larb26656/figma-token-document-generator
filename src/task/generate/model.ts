export interface Doc {
  title: string;
  properties: Record<string, string>;
}

export interface Setting {
  component: string;
  docs: Doc[];
}
