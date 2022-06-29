declare global {
  type TCellEvaluation = "absent" | "present" | "correct" | undefined;

  interface ICell {
    eval: TCellEvaluation;
    letter: string;
  }

  type TBoard = Array<Array<ICell>>;

  type TToastVariant = "success" | "error";
  interface IToastOptions {
    variant?: TToastVariant;
  }

  interface IToast extends Pick<IToastOptions, "variant"> {
    id: string;
    message: string;
  }

  interface IToastState {
    toasts: Array<IToast>;
  }

  interface IGameState {
    score: number;
  }
}
export {};
