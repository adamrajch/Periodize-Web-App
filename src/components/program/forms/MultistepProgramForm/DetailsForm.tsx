import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MultiSelect, NumberInput, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { PROGRAM_CATEGORIES } from "../../../../constants/CreateProgram";
import { useProgramWizardForm } from "../../../../lib/slices/createProgramWizard";
import type { WizardDetailsFormType } from "../../../../types/ProgramTypes";
import { WizardDetailsSchema } from "../../../../types/ProgramTypes";
import { api } from "../../../../utils/api";
import HFTextInput from "../../../ui/HFTexInput";
import HFTextarea from "../../../ui/HFTextarea";

export default function WizardDetailsForm() {
  const updateForm = useProgramWizardForm((state) => state.updateAction);
  const contextForm = useProgramWizardForm((state) => state.form);
  const utils = api.useContext();
  const router = useRouter();

  const programCreate = api.program.createProgram.useMutation({
    onSettled(data) {
      utils.program.getById.invalidate(data?.id);
      router.push(`/dashboard/programs/${data?.id}`);
    },
  });
  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<WizardDetailsFormType>({
    defaultValues: {
      name: contextForm.name,
      description: contextForm.description,
      categories: contextForm.categories,
      numWeeks: contextForm.numWeeks,
    },
    resolver: zodResolver(WizardDetailsSchema),
  });

  const submitForm: SubmitHandler<WizardDetailsFormType> = useCallback(
    async (data: WizardDetailsFormType, e) => {
      e?.preventDefault();
      console.log("form data" + JSON.stringify(data, null, 2));
      updateForm({ ...data });

      try {
        programCreate.mutate({
          name: getValues("name"),
          description: getValues("description"),
          categories: getValues("categories"),
          numWeeks: getValues("numWeeks"),
        });
      } catch (err) {
        console.log("errors: ", err);
      }
    },
    [updateForm, router]
  );

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack>
          <HFTextInput
            label="Program Name"
            error={errors.name?.message}
            registerProps={register("name")}
          />
          <HFTextarea
            label="Description"
            error={errors.description?.message}
            registerProps={register("description")}
          />
          <Controller
            control={control}
            name="categories"
            render={({ field: { onChange, onBlur } }) => (
              <MultiSelect
                data={PROGRAM_CATEGORIES}
                label="Disciplines to be trained"
                placeholder="Pick all relative"
                onChange={onChange}
                onBlur={onBlur}
                error={errors.categories?.message}
                value={getValues("categories")}
              />
            )}
          />
          <Controller
            control={control}
            name="numWeeks"
            render={({ field: { onChange, onBlur } }) => (
              <NumberInput
                placeholder="bruh"
                label="Number of Weeks"
                withAsterisk
                onChange={onChange}
                onBlur={onBlur}
                error={errors.categories?.message}
                value={getValues("numWeeks")}
                max={24}
                min={0}
                step={1}
              />
            )}
          />

          <Button onClick={() => reset()}>Reset</Button>
          <Button
            variant="filled"
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}
