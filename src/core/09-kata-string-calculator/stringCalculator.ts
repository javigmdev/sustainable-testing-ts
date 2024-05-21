const nothingToAdd = 0;

export function sumNumbers(expression: string) {
  if (!expression) {
    return nothingToAdd;
  }
  const beginningOfConfig = '//';
  let separator = ',';
  if (expression.startsWith(beginningOfConfig)) {
    const endOfConfig = '/';
    separator = getSeparator(expression, beginningOfConfig, endOfConfig);
    expression = removeConfigFrom(expression, endOfConfig);
  }
  const tokens = expression.split(separator);
  return tokens.map(getNumber).reduce(sum);
}

function getSeparator(
  expression: string,
  beginningOfConfig: string,
  endOfConfig: string,
) {
  return expression.slice(
    beginningOfConfig.length,
    expression.lastIndexOf(endOfConfig),
  );
}

function removeConfigFrom(expression: string, endOfConfig: string) {
  return expression.slice(expression.lastIndexOf(endOfConfig) + 1);
}

function getNumber(token: string) {
  const parsedToken = Number(token);
  return isNaN(parsedToken) ? nothingToAdd : parsedToken;
}

function sum(previousNumber, currentNumber) {
  return previousNumber + currentNumber;
}
