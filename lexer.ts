export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Let
}

const KEYWORDS: Record<string, TokenType> = {
  "let": TokenType.Let,
}

export class Token {

  value: string;
  type: TokenType;

  constructor(value: string, type: TokenType) {
    this.value = value;
    this.type = type;
  }
}

function isAlpha(char: string): boolean {
  return char.toLowerCase() !== char.toUpperCase();
}

function isNumber(char: string): boolean {
  return !(isNaN(parseInt(char)));
}

function tokenize(sourceCode: string): Token[] {

  const tokens: Token[] = [];
  const src: string[] = sourceCode.split("");

  console.log(src);

  while (src.length > 0) {
    if (src[0] === '(') {
      tokens.push(new Token(src.shift()!, TokenType.OpenParen));
    } else if (src[0] === ')') {
      tokens.push(new Token(src.shift()!, TokenType.CloseParen));
    } else if (src[0] === '+' || src[0] === '-' || src[0] === '*' || src[0] === '/') {
      tokens.push(new Token(src.shift()!, TokenType.BinaryOperator));
    } else if (src[0] === '=') {
      tokens.push(new Token(src.shift()!, TokenType.Equals));
    } else {
      if (isAlpha(src[0])) {
        let str = "";
        while (src.length > 0 && isAlpha(src[0])) {
          str += src.shift();
        }

        const reserved = KEYWORDS[str];
        console.log(reserved);
        if (reserved === undefined) {
          tokens.push(new Token(str, TokenType.Identifier));
        } else {
          tokens.push(new Token(str, reserved));
        }

      } else if (isNumber(src[0])) {
        let num = "";
        while (src.length > 0 && isNumber(src[0])) {
          num += src.shift();
        }
        tokens.push(new Token(num, TokenType.Number));
      }
      src.shift();
    }
  }
  
  return tokens;

}

console.log(tokenize("let haha = 0 + (23 / 2)"));