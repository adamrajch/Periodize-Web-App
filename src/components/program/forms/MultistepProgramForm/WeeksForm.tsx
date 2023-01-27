import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Group, Stack } from "@mantine/core";
import { IconMinus } from "@tabler/icons";
import HFTextInput from "@ui/HFTexInput";
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useProgramWizardForm } from "../../../../lib/slices/createProgramWizard";
import {
  WizardWeeksFormType,
  WizardWeeksSchema,
} from "../../../../types/ProgramTypes";

export default function WizardWeeksForm() {
  const updateForm = useProgramWizardForm((state) => state.updateAction);
  const contextForm = useProgramWizardForm((state) => state.form);
  const {
    handleSubmit,
    register,
    reset,
    control,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<WizardWeeksFormType>({
    defaultValues: {
      weeks: [],
    },
    resolver: zodResolver(WizardWeeksSchema),
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "weeks",
  });

  const router = useRouter();
  const submitForm: SubmitHandler<WizardWeeksFormType> = useCallback(
    (data: WizardWeeksFormType, e) => {
      e?.preventDefault();
      console.log("form data" + JSON.stringify(data, null, 2));
      updateForm({ ...data });

      // router.push("/dashboard/create/days");
    },
    [updateForm, router],
  );

  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <>
      <h1>Renders: {renderCounter.current}</h1>

      <form onSubmit={handleSubmit(submitForm)}>
        <Stack>
          <Group>
            <Button
              type="button"
              onClick={() =>
                append({
                  name: `Week ${getValues().weeks.length + 1}`,
                  summary: "",
                  days: [],
                })
              }
            >
              Add
            </Button>
          </Group>

          <ul>
            {fields.map((field, index) => (
              <li key={field.id}>
                <Group align="flex-end">
                  <HFTextInput
                    label="Week Name"
                    error={errors.weeks?.[index]?.name?.message}
                    registerProps={register(`weeks.${index}.name`)}
                    defaultValue={field.name}
                    sx={{ flexGrow: 1 }}
                  />
                  <ActionIcon variant="filled" onClick={() => remove(index)}>
                    <IconMinus size={18} />
                  </ActionIcon>
                </Group>
              </li>
            ))}
          </ul>

          <pre>{JSON.stringify(contextForm, null, 2)}</pre>
          {/* <pre>ERRORS: {JSON.stringify(errors)}</pre> */}

          <Button onClick={() => reset()}>Reset</Button>
          <Button
            variant="filled"
            loading={isSubmitting}
            // disabled={!isValid}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}
