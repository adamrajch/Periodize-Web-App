import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Group, MultiSelect, Stack } from "@mantine/core";
import { IconMinus } from "@tabler/icons";
import HFTextInput from "@ui/HFTexInput";
import HFTextarea from "@ui/HFTextarea";
// import NumberInput from "@ui/NumberInput";

import { useCallback, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { ProgramTemplateSchemaType } from "../../../../types/ProgramTypes";
import { ProgramTemplateSchema } from "../../../../types/ProgramTypes";

export default function MultistepProgramForm() {
  const {
    handleSubmit,
    register,
    // setError,
    reset,
    control,
    watch,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProgramTemplateSchemaType>({
    defaultValues: {
      name: "",
      desc: "",
      category: undefined,

      weeks: [],
    },
    resolver: zodResolver(ProgramTemplateSchema),
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "weeks",
  });

  const submitForm: SubmitHandler<ProgramTemplateSchemaType> = useCallback(
    (data: ProgramTemplateSchemaType, e) => {
      e?.preventDefault();
      console.log("submitting");
      alert("submitting!" + JSON.stringify(data, null, 2));
    },
    []
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
                data={[
                  { value: "bodybuilding", label: "Bodybuilding" },
                  { value: "powerlifting", label: "Powerlifting" },
                  {
                    value: "olympic weightlifting",
                    label: "Olympic Weightlifting",
                  },
                  { value: "sport", label: "Sport" },
                ]}
                label="Disciplines to be trained"
                placeholder="Pick all relative"
                onChange={onChange}
                onBlur={onBlur}
                error={errors.category?.message}
              />
            )}
          />
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
          {/* <WeeksFieldArray
            {...{
              control,
              register,
              errors,
            }}
          /> */}
          <ul>
            {fields.map((field, index) => (
              <li key={field.id}>
                <Group align="flex-end">
                  <HFTextInput
                    label="Week Name"
                    error={errors.name?.message}
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
          <Group>
            <p>Week Builder</p>
            <Button
              onClick={() => {
                if (getValues().weeks.length > 6) {
                } else {
                  append({
                    name: `Week ${getValues().weeks.length + 1}`,
                    summary: "",
                    days: [],
                  });
                }
              }}
            >
              Add Day
            </Button>
          </Group>

          {/* <pre>{JSON.stringify(watch())}</pre> */}
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
