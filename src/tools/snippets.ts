export function commaNumber(rawNumber: number) {
  return (rawNumber && rawNumber.toLocaleString('en-US')) || 0;
}
