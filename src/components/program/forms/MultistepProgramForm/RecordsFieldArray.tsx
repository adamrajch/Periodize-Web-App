import { ActionIcon, NativeSelect, SimpleGrid } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { Control } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";
import { PROGRAM_PERIODIZATION_STYLES } from "../../../../constants/CreateProgram";
import type {
  SingleWorkoutType,
  WizardDaysFormType,
} from "../../../../types/ProgramTypes";

type RecordsFieldArrayProps = {
  dayIndex: number;
  workoutIndex: number;
  control: Control<WizardDaysFormType>;
  register: any;
  errors: any;
  workout: SingleWorkoutType;
};

export default function RecordsFieldArray({
  dayIndex,
  workoutIndex,
  control,
  errors,
  register,
  workout,
}: RecordsFieldArrayProps) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `days.${dayIndex}.workouts.${workoutIndex}.records` as const,
  });
  return (
    <div>
      {fields.map((record, rI) => (
        <>
          <SimpleGrid cols={5}>
            <Controller
              control={control}
              name={`days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.periodization`}
              render={({ field: { onChange, onBlur } }) => (
                <NativeSelect
                  data={PROGRAM_PERIODIZATION_STYLES}
                  label="Disciplines to be trained"
                  placeholder="Pick all relative"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.periodization?.message}
                />
              )}
            />
            {/* <HFTextInput
              label="sets"
              error={
                errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[rI]
                  .sets
              }
              registerProps={register(
                `days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.sets`
              )}
            />
            <HFTextInput
              label="reps"
              error={
                errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[rI]
                  .reps
              }
              registerProps={register(
                `days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.reps`
              )}
            />
            <HFTextInput
              label="rpe"
              error={
                errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[rI]
                  .rpe
              }
              registerProps={register(
                `days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.rpe`
              )}
            />
            <HFTextInput
              label="percent"
              error={
                errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[rI]
                  .percent
              }
              registerProps={register(
                `days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.percent`
              )}
            /> */}
            <ActionIcon variant="filled" color="red" onClick={() => remove(rI)}>
              <IconX />
            </ActionIcon>
          </SimpleGrid>
        </>
      ))}
    </div>
  );
}
