import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MultiSelect, NumberInput, Stack } from "@mantine/core";

import { useRouter } from "next/router";
// import NumberInput from "@ui/NumberInput";

import { useCallback, useRef } from "react";
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
  const {
    data: returnedProgram,
    mutate,
    isSuccess,
  } = api.program.createProgram.useMutation();
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
      desc: contextForm.desc,
      category: contextForm.category,
      numWeeks: contextForm.numWeeks,
    },
    resolver: zodResolver(WizardDetailsSchema),
  });

  const router = useRouter();
  const submitForm: SubmitHandler<WizardDetailsFormType> = useCallback(
    async (data: WizardDetailsFormType, e) => {
      e?.preventDefault();
      console.log("form data" + JSON.stringify(data, null, 2));
      updateForm({ ...data });

      try {
        mutate({
          name: getValues("name"),
          desc: getValues("desc"),
          category: getValues("category"),
          numWeeks: getValues("numWeeks"),
        });

        if (isSuccess) {
          router.push(`/dashboard/programs/${returnedProgram.id} `);
        }
      } catch (err) {
        console.log("errors: ", err);
      }

      // router.push("/create/weeks");
    },
    [updateForm, router]
  );

  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <>
      <h1>Renders: {renderCounter.current}</h1>

      <form onSubmit={handleSubmit(submitForm)}>
        <Stack>
          <HFTextInput
            label="Program Name"
            error={errors.name?.message}
            registerProps={register("name")}
          />
          <HFTextarea
            label="Description"
            error={errors.desc?.message}
            registerProps={register("desc")}
          />
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, onBlur } }) => (
              <MultiSelect
                data={PROGRAM_CATEGORIES}
                label="Disciplines to be trained"
                placeholder="Pick all relative"
                onChange={onChange}
                onBlur={onBlur}
                error={errors.category?.message}
                value={getValues("category")}
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
                error={errors.category?.message}
                value={getValues("numWeeks")}
                max={24}
                min={0}
                step={1}
              />
            )}
          />
          <pre>{JSON.stringify(contextForm, null, 2)}</pre>
          <pre>{JSON.stringify(errors)}</pre>
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
