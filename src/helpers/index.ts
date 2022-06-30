export const deepClone2DArray = <T>(arr: unknown[][]) => {
  return JSON.parse(JSON.stringify(arr)) as T;
};

export const checkWin = (
  row: ICell[],
  target: string
): Array<TCellEvaluation> => {
  const upperTarget = target.toUpperCase();
  const rowLen = row.length;

  const result: Array<TCellEvaluation> = [];

  const remainTargetChar = Array.from(upperTarget);

  for (let idx = 0; idx < rowLen; idx++) {
    const letter = row[idx].letter.toUpperCase();
    const remainTargetCharIdx = remainTargetChar.findIndex((c) => c === letter);

    if (letter === upperTarget[idx]) {
      result.push("correct");
      remainTargetChar.splice(remainTargetCharIdx, 1);
    } else if (
      upperTarget.includes(letter) &&
      remainTargetChar.includes(letter)
    ) {
      result.push("present");
      remainTargetChar.splice(remainTargetCharIdx, 1);
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

export const generateBoard = (rows: number, cols: number) =>
  Array(rows).fill(Array<ICell>(cols).fill({ letter: "", eval: undefined }));
