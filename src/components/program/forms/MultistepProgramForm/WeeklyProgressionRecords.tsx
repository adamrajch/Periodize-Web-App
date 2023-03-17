import { ActionIcon, SimpleGrid, Stack } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type {
  SingleWorkoutType,
  WizardDaysFormType,
} from "../../../../types/ProgramTypes";
import HFNumberInput from "../../../ui/HFNumberInput";

type RecordsFieldArrayProps = {
  dayIndex: number;
  workoutIndex: number;
  recordIndex: number;
  control: Control<WizardDaysFormType>;
  register: any;
  errors: any;
  workout: SingleWorkoutType;
  getValues: any;
};

export default function WeekProgressionRecords({
  recordIndex,
  dayIndex,
  workoutIndex,
  control,
  errors,
  register,
  workout,
  getValues,
}: RecordsFieldArrayProps) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `days.${dayIndex}.workouts.${workoutIndex}.records.${recordIndex}.weekProgression` as const,
  });
  return (
    <div>
      {fields.map((record, pI) => (
        <Stack key={record.id}>
          <SimpleGrid cols={5}>
            <HFNumberInput
              label="sets"
              error={
                errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[pI]
                  .weekProgression?.[pI].sets
              }
              fieldName={`days.${dayIndex}.workouts.${workoutIndex}.records.${pI}.weekProgression.${pI}.sets`}
              control={control}
              value={getValues(
                `days.${dayIndex}.workouts.${workoutIndex}.records.${pI}.weekProgression.${pI}.sets`
              )}
              min={1}
              step={1}
            />
            <HFNumberInput
              label="reps"
              error={
                errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[pI]
                  .weekProgression?.[pI].reps
              }
              fieldName={`days.${dayIndex}.workouts.${workoutIndex}.records.${pI}.weekProgression.${pI}.reps`}
              control={control}
              value={getValues(
                `days.${dayIndex}.workouts.${workoutIndex}.records.${pI}.weekProgression.${pI}.reps`
              )}
              min={1}
              step={1}
              max={100}
            />
            <HFNumberInput
              label="rpe"
              error={
                errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[pI]
                  .weekProgression?.[pI].rpe
              }
              fieldName={`days.${dayIndex}.workouts.${workoutIndex}.records.${pI}.weekProgression.${pI}.rpe`}
              control={control}
              value={getValues(
                `days.${dayIndex}.workouts.${workoutIndex}.records.${pI}.weekProgression.${pI}.rpe`
              )}
              max={10}
              step={1}
            />
            <HFNumberInput
              label="percent"
              error={
                errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[pI]
                  .weekProgression?.[pI].percent
              }
              fieldName={`days.${dayIndex}.workouts.${workoutIndex}.records.${pI}.weekProgression.${pI}.percent`}
              control={control}
              value={getValues(
                `days.${dayIndex}.workouts.${workoutIndex}.records.${pI}.weekProgression.${pI}.percent`
              )}
              min={1}
              step={5}
              max={100}
            />

            <ActionIcon variant="filled" color="red" onClick={() => remove(pI)}>
              <IconX />
            </ActionIcon>
          </SimpleGrid>
        </Stack>
      ))}
    </div>
  );
}
