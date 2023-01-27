import { create } from "zustand";
import { ProgramTemplateSchemaType } from "../../types/ProgramTypes";

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
  },
  updateAction: (values) =>
    set((prev) => ({ form: { ...prev.form, ...values } })),
}));
