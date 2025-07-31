import { create } from "zustand";

type QuizState = {
  title: string;
  setTitle: (title: string) => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),
}));
