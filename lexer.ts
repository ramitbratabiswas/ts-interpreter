export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Assign
}

export interface Token {
  value: string;
  type: TokenType;
}

function tokenize(sourceCode: string) {

  const tokens: Token[] = [];
  const src: string[] = sourceCode.split("");

  console.log(src);
  
  return tokens;

}

tokenize("haha");