declare global {
  type TCellEvaluation = "absent" | "present" | "correct" | undefined;

  interface ICell {
    eval: TCellEvaluation;
    letter: string;
  }

  type TBoard = Array<Array<ICell>>;

  interface IToast {
    id: string;
    message: string;
  }
  interface IToastState {
    toasts: Array<IToast>;
  }
}
export {};
