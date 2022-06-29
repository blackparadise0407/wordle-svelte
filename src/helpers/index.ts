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

export const randomNoRepeats = (array: string[]) => {
  var copy = array.slice(0);
  return function () {
    if (copy.length < 1) {
      copy = array.slice(0);
    }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    return item;
  };
};
