export interface TokenNode {
  name: string;
  details: TokenDetail[];
}

export interface TokenDetail {
  usage: string;
  token: string;
}
