export function commaNumber(rawNumber: number) {
  return (rawNumber && rawNumber.toLocaleString('en-US')) || 0;
}

export function isEmptyString(string: string) {
  return string.length === 0 || !string.trim();
}
