import { create } from "zustand";
import type { ProgramTemplateSchemaType } from "../../types/ProgramTypes";

interface FormState {
  form: ProgramTemplateSchemaType;
  updateAction: (values: Partial<ProgramTemplateSchemaType>) => void;
}
export const useProgramWizardForm = create<FormState>((set) => ({
  form: {
    name: "",
    desc: "",
    category: ["bodybuilding"],
    weeks: [],
    numWeeks: 12,
  },
  updateAction: (values) =>
    set((prev) => ({ form: { ...prev.form, ...values } })),
}));
