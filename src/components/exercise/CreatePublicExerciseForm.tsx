import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MultiSelect, Stack } from "@mantine/core";
import { useCallback } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../utils/api";
import HFTextInput from "../ui/HFTexInput";

const FormSchema = z.object({
  name: z.string().min(3, { message: "atleast 3 characters bruh" }),
  load: z.boolean(),
  time: z.boolean(),
  distance: z.boolean(),
  categories: z.array(
    z.union([
      z.literal("bodybuilding"),
      z.literal("powerlifting"),
      z.literal("olympic weightlifting"),
      z.literal("sport"),
    ])
  ),
});

export default function CreatePublicExerciseForm() {
  const utils = api.useContext();
  const mutation = api.exercise.createExercise.useMutation({
    onSuccess() {
      utils.exercise.getAll.invalidate();
    },
  });
  type FormSchemaType = z.infer<typeof FormSchema>;
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    defaultValues: {
      name: "",
      load: true,
      time: false,
      distance: false,
      categories: [],
    },
    resolver: zodResolver(FormSchema),
  });

  const submitForm: SubmitHandler<FormSchemaType> = useCallback(
    (data: FormSchemaType, e) => {
      e?.preventDefault();
      console.log("form data" + JSON.stringify(data, null, 2));
      mutation.mutate({ ...data });
      reset();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>Jello</div>
      <Stack>
        <HFTextInput
          label="lift name"
          registerProps={register("name")}
          error={errors.name?.message}
        />
        <Controller
          control={control}
          name="categories"
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
              error={errors.categories?.message}
            />
          )}
        />
        <Button type="submit" loading={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
