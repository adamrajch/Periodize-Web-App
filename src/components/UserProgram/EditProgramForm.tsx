import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { WizardWeeksFormType } from "../../types/ProgramTypes";
import { WizardWeeksSchema } from "../../types/ProgramTypes";
import { api } from "../../utils/api";

type Props = {
  id: string;
  template: WizardWeeksFormType;
};

export default function EditProgramForm({ id, template }: Props) {
  const utils = api.useContext();
  const programUpdate = api.program.updateProgramTemplate.useMutation({
    onSettled() {
      utils.program.getById.invalidate(id);
    },
  });
  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<WizardWeeksFormType>({
    defaultValues: {
      weeks: template,
    },
    resolver: zodResolver(WizardWeeksSchema),
  });

  const submitForm: SubmitHandler<WizardWeeksFormType> = useCallback(
    async (data: WizardWeeksFormType, e) => {
      e?.preventDefault();

      programUpdate.mutate({
        id: id,
        template: data.weeks,
      });
    },
    []
  );

  return <div>EditProgramForm</div>;
}
