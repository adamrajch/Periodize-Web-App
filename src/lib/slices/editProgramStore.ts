import { create } from "zustand";

interface FormState {
  weekIndex: number;
  dayIndex: number;
  workoutIndex: number;
  setWeekIndex: (value: number) => void;
  setDayIndex: (value: number) => void;
}

export const useEditProgramStore = create<FormState>((set) => ({
  weekIndex: 0,
  dayIndex: 0,
  workoutIndex: 0,

  setWeekIndex: (value: number) => set(() => ({ weekIndex: value })),
  setDayIndex: (value: number) => set(() => ({ dayIndex: value })),

  // deleteWeekIndex: (index: number, length: number) => {
  //   // combine with remove(index), sets the active weekIndex
  //   if (index === 0) {
  //     return;
  //   } else if (length === index + 1) {
  //     // last week in the list, go to the week prior
  //     set((state) => ({
  //       form: { ...state.form, weekIndex: state.form.weekIndex - 1 },
  //     }));
  //   } else {
  //     // middle of the list, go the week after
  //     set((state) => ({
  //       form: { ...state.form, weekIndex: state.form.weekIndex + 1 },
  //     }));
  //   }
  //   // delete day need to check if only day, also delete the week.
  // },
}));
