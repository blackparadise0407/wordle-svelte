export const deepClone2DArray = <T>(arr: unknown[][]) => {
  return JSON.parse(JSON.stringify(arr)) as T;
};

export const checkWin = (
  row: ICell[],
  target: string
): Array<TCellEvaluation> => {
  console.time("checkWin");
  const lowerTarget = target.toLowerCase();
  const rowLen = row.length;

  const result: Array<TCellEvaluation> = [];

  const remainTargetChar = Array.from(lowerTarget);

  for (let idx = 0; idx < rowLen; idx++) {
    const letter = row[idx].letter.toLowerCase();
    const remainTargetCharIdx = remainTargetChar.findIndex((c) => c === letter);

    if (letter === lowerTarget[idx]) {
      result.push("correct");
      remainTargetChar.splice(remainTargetCharIdx, 1);
    } else if (
      lowerTarget.includes(letter) &&
      remainTargetChar.includes(letter)
    ) {
      result.push("present");
      remainTargetChar.splice(remainTargetCharIdx, 1);
    } else {
      result.push("absent");
    }
  }
  console.timeEnd("checkWin");

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

export const generateBoard = (rows: number, cols: number) =>
  Array(rows).fill(Array<ICell>(cols).fill({ letter: "", eval: undefined }));
