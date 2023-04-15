import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useCallback, useEffect } from "react";
import type { Control, UseFormGetValues } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { useDisclosure } from "@mantine/hooks";
import type {
  SingleWorkoutType,
  WizardWeeksFormType,
} from "../../types/ProgramTypes";
import { SingleWorkout } from "../../types/ProgramTypes";
import HFNumberInput from "../ui/HFNumberInput";
import HFSelect from "../ui/HFSelect";

type SingleWorkoutModalProps = {
  workout: SingleWorkoutType;
  getFormValues: UseFormGetValues<WizardWeeksFormType>;
  removeWorkout: (index: number) => void;
  workoutIndex: number;
  formControl: Control<WizardWeeksFormType>;
};

const ExerciseListSchema = z.array(
  SingleWorkout.and(
    z.object({
      weekIndex: z.number(),
      dayIndex: z.number(),
      workoutIndex: z.number(),
    })
  )
);
type ListExercisesType = z.infer<typeof ExerciseListSchema>;

const PeriodizationSchema = z.object({
  exercises: ExerciseListSchema,
  weekSpan: z.number().min(1).max(16),
  periodization: z
    .enum(["linear", "step", "dup", "conjugate"])
    .or(z.undefined()),
});

type PeriodizationFormType = z.infer<typeof PeriodizationSchema>;

export default function WorkoutGenerationModal({
  workout,
  getFormValues,
  removeWorkout,
  workoutIndex,
  formControl,
}: SingleWorkoutModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    control,
    reset,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PeriodizationFormType>({
    defaultValues: {
      exercises: getExercises(),
      weekSpan: 1,
      periodization: undefined,
    },
    resolver: zodResolver(PeriodizationSchema),
  });

  const { fields } = useFieldArray({
    control,
    name: "exercises",
  });

  const handleClose = useCallback(() => {
    reset();
    close();
  }, [reset, close]);

  useEffect(() => {
    setValue("exercises", getExercises());
  }, [open, getExercises, setValue]);

  // const submitForm = useCallback(async () => {
  //   handleClose();
  // }, [handleClose]);

  function getExercises(): ListExercisesType {
    const list = [];

    const weekLength = getFormValues("weeks").length;
    for (let i = 0; i < weekLength; i++) {
      for (let k = 0; k < getFormValues(`weeks.${i}.days`).length; k++) {
        for (
          let j = 0;
          j < getFormValues(`weeks.${i}.days.${k}.workouts`).length;
          j++
        ) {
          const selected = getFormValues(
            `weeks.${i}.days.${k}.workouts.${j}`
          ) as SingleWorkoutType;
          if (
            selected.exerciseId === workout.exerciseId &&
            selected.type === "single"
          )
            list.push({
              weekIndex: i,
              dayIndex: k,
              workoutIndex: j,
              ...getFormValues(`weeks.${i}.days.${k}.workouts.${j}`),
            });
        }
      }
    }

    return list as ListExercisesType;
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        centered
        withCloseButton={false}
        size="auto"
      >
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

            <ActionIcon onClick={() => removeWorkout(workoutIndex)}>
              <IconTrash color="red" />
            </ActionIcon>
          </Group>
          <Stack>
            {fields.map((record, rI) => (
              <Group grow noWrap key={record.id}>
                <Text sx={{ flexGrow: 0 }}>
                  W{record.weekIndex + 1}D{record.dayIndex + 1}
                </Text>
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
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </form>
      </Modal>
      <Group position="center">
        <Button component="span" variant="subtle" onClick={open}>
          {workout.name}
        </Button>
      </Group>
    </>
  );
}
