export function isStrongPassword(password: string) {
  return (
    hasSixCharactersOrMore(password) &&
    containsNumber(password) &&
    containsLowerCase(password) &&
    containsUpperCase(password) &&
    containsUnderscore(password)
  );
}

function hasSixCharactersOrMore(password: string) {
  return password.length >= 6;
}

function containsNumber(password: string) {
  return /.*\d.*/.test(password);
}

function containsLowerCase(password: string) {
  return /.*[a-z].*/.test(password);
}

function containsUpperCase(password: string) {
  return /.*[A-Z].*/.test(password);
}

function containsUnderscore(password: string) {
  return password.includes('_');
}
