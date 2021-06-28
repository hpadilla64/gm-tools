export function commaNumber(rawNumber: number) {
  return (rawNumber && rawNumber.toLocaleString('en-US')) || 0;
}

export function isEmptyString(string: string) {
  return string.length === 0 || !string.trim();
}

export function moveElementInArray(array: any[], moveElement: any, anchorElement: any, moveAfter?: boolean) {
  return array.reduce((acc: any[], currentVal: any) => {
    if (currentVal === anchorElement) {
      if (moveAfter) {
        return [...acc, currentVal, moveElement];
      }
      return [...acc, moveElement, currentVal];
    }
    if (currentVal === moveElement) {
      return [...acc];
    }
    return [...acc, currentVal];
  }, []);
}
