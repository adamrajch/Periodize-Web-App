import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useCallback, useEffect } from "react";
import type { UseFormGetValues } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import type {
  SingleWorkoutType,
  WizardWeeksFormType,
} from "../../types/ProgramTypes";
import { RecordSchema } from "../../types/ProgramTypes";
import ContentModal from "../ui/ContentModal";
import HFNumberInput from "../ui/HFNumberInput";
import HFSelect from "../ui/HFSelect";

type SingleWorkoutModalProps = {
  workout: SingleWorkoutType;
  getFormValues: UseFormGetValues<WizardWeeksFormType>;
};

const PeriodizationSchema = z.object({
  exercises: z.array(RecordSchema),
  weekSpan: z.number().min(1).max(16),
  periodization: z
    .enum(["linear", "step", "dup", "conjugate"])
    .or(z.undefined()),
});

type PeriodizationFormType = z.infer<typeof PeriodizationSchema>;

export default function SingleWorkoutModal({
  workout,
  getFormValues,
}: SingleWorkoutModalProps) {
  const {
    control,
    reset,
    getValues,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<PeriodizationFormType>({
    defaultValues: {
      exercises: [
        {
          sets: 5,
          reps: 5,
          rpe: undefined,
          percent: undefined,
          exerciseId: "1",
          exerciseName: "",
        },
      ],
      weekSpan: 1,
      periodization: undefined,
    },
    resolver: zodResolver(PeriodizationSchema),
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "exercises",
  });

  const handleClose = useCallback(() => {
    reset();
  }, [reset]);

  const submitForm = useCallback(async () => {
    handleClose();
  }, [handleClose]);

  useEffect(() => {}, [getValues()]);

  const Butt: FC<{ onClick: () => void }> = ({ onClick }) => (
    <Button onClick={onClick}>Edit</Button>
  );
  return (
    <>
      <ContentModal Trigger={Butt} handleClose={() => console.log("hello")}>
        <form>
          <Group position="apart">
            <Title order={3}>{workout.name}</Title>
            <HFNumberInput
              label="Weeks"
              control={control}
              error={errors?.weekSpan?.message}
              fieldName={"weekSpan"}
              value={getValues("weekSpan")}
              min={1}
              step={1}
            />
            <HFSelect
              label="Periodization"
              placeholder="chose one"
              data={[
                {
                  label: "linear",
                  value: "linear",
                },
              ]}
              control={control}
              fieldName="periodization"
            />
          </Group>
          <Stack>
            {fields.map((record, rI) => (
              <Group grow noWrap key={record.id}>
                <Text sx={{ flexGrow: 0 }}>{rI + 1}</Text>
                <HFNumberInput
                  label="sets"
                  control={control}
                  error={errors?.exercises?.[rI]?.sets?.message}
                  fieldName={`exercises.${rI}.sets`}
                  value={record.sets}
                  min={1}
                  step={1}
                  sx={{ maxWidth: "100%" }}
                />
                <HFNumberInput
                  label="reps"
                  control={control}
                  error={errors?.exercises?.[rI]?.reps?.message}
                  fieldName={`exercises.${rI}.reps`}
                  value={record.reps}
                  min={1}
                  step={1}
                  sx={{ maxWidth: "100%" }}
                />
                <HFNumberInput
                  label="rpe"
                  control={control}
                  error={errors?.exercises?.[rI]?.rpe?.message}
                  fieldName={`exercises.${rI}.rpe`}
                  value={record.rpe}
                  min={1}
                  step={1}
                  sx={{ maxWidth: "100%" }}
                />
                <HFNumberInput
                  label="percent"
                  control={control}
                  error={errors?.exercises?.[rI]?.percent?.message}
                  fieldName={`exercises.${rI}.percent`}
                  value={record.percent}
                  min={1}
                  step={1}
                  sx={{ maxWidth: "100%" }}
                />
              </Group>
            ))}
          </Stack>
        </form>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </ContentModal>
    </>
  );
}
