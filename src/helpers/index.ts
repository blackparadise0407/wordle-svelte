export const deepClone2DArray = <T>(arr: unknown[][]) => {
  return JSON.parse(JSON.stringify(arr)) as T;
};

export const checkWin = (
  row: ICell[],
  target: string
): Array<TCellEvaluation> => {
  const lowerTarget = target.toLowerCase();
  const rowLen = row.length;

  const result: Array<TCellEvaluation> = [];

  for (let idx = 0; idx < rowLen; idx++) {
    const letter = row[idx].letter.toLowerCase();
    if (letter === lowerTarget[idx]) {
      result.push("correct");
    } else if (lowerTarget.includes(letter)) {
      result.push("present");
    } else {
      result.push("absent");
    }
  }
  return result;
};
