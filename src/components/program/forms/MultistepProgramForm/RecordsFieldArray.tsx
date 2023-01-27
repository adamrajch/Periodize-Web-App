import { ActionIcon, SimpleGrid } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type { WizardDaysFormType } from "../../../../types/ProgramTypes";
import HFTextInput from "../../../ui/HFTexInput";

type RecordsFieldArrayProps = {
  dayIndex: number;
  workoutIndex: number;
  control: Control<WizardDaysFormType>;
  register: any;
  errors: any;
};

export default function RecordsFieldArray({
  dayIndex,
  workoutIndex,
  control,
  errors,
  register,
}: RecordsFieldArrayProps) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `days.${dayIndex}.workouts.${workoutIndex}.records`,
  });
  return (
    <div>
      {fields.map((record, rI) => (
        <>
          <SimpleGrid cols={5}>
            <HFTextInput
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
            />
            <ActionIcon variant="filled" color="red" onClick={() => remove(rI)}>
              <IconX />
            </ActionIcon>
          </SimpleGrid>
        </>
      ))}
    </div>
  );
}
