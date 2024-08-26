"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenType = void 0;
var fs = require("fs");
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Number"] = 0] = "Number";
    TokenType[TokenType["Identifier"] = 1] = "Identifier";
    TokenType[TokenType["Equals"] = 2] = "Equals";
    TokenType[TokenType["OpenParen"] = 3] = "OpenParen";
    TokenType[TokenType["CloseParen"] = 4] = "CloseParen";
    TokenType[TokenType["BinaryOperator"] = 5] = "BinaryOperator";
    TokenType[TokenType["Let"] = 6] = "Let";
})(TokenType || (exports.TokenType = TokenType = {}));
var KEYWORDS = {
    "let": TokenType.Let,
};
var Token = /** @class */ (function () {
    function Token(value, type) {
        this.value = value;
        this.type = type;
    }
    return Token;
}());
exports.Token = Token;
function isAlpha(char) {
    return char.toLowerCase() !== char.toUpperCase();
}
function isNumber(char) {
    return !(isNaN(parseInt(char)));
}
function isSkippable(char) {
    return char === " " || char === "\n" || char === "\r" || char === "\t";
}
function tokenize(sourceCode) {
    var tokens = [];
    var src = sourceCode.split("");
    console.log(src);
    while (src.length > 0) {
        if (src[0] === '(') {
            tokens.push(new Token(src.shift(), TokenType.OpenParen));
        }
        else if (src[0] === ')') {
            tokens.push(new Token(src.shift(), TokenType.CloseParen));
        }
        else if (src[0] === '+' || src[0] === '-' || src[0] === '*' || src[0] === '/') {
            tokens.push(new Token(src.shift(), TokenType.BinaryOperator));
        }
        else if (src[0] === '=') {
            tokens.push(new Token(src.shift(), TokenType.Equals));
        }
        else {
            if (isAlpha(src[0])) {
                var str = "";
                while (src.length > 0 && isAlpha(src[0])) {
                    str += src.shift();
                }
                var reserved = KEYWORDS[str];
                console.log(reserved);
                if (reserved === undefined) {
                    tokens.push(new Token(str, TokenType.Identifier));
                }
                else {
                    tokens.push(new Token(str, reserved));
                }
            }
            else if (isNumber(src[0])) {
                var num = "";
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
var out = fs.readFileSync("./lexer.ts", "utf8");
console.log(tokenize(out));
