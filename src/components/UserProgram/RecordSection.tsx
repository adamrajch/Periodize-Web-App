import { ActionIcon, Group } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";
import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type { WizardWeeksFormType } from "../../types/ProgramTypes";
import HFNumberInput from "../ui/HFNumberInput";

export default function RecordSection({
  control,
  register,
  getValues,
  errors,
}: {
  control: Control<WizardWeeksFormType>;
  register: any;
  getValues: any;
  errors: any;
}) {
  const { weekIndex, dayIndex, workoutIndex } = useEditProgramStore();
  const { fields, remove, append } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records` as const,
  });

  return (
    <>
      {fields.map((record, rI) => (
        <Group key={record.id}>
          <HFNumberInput
            label="sets"
            error={
              errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[rI]
                .sets
            }
            fieldName={`days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.sets`}
            control={control}
            value={getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.sets`
            )}
            min={1}
            step={1}
          />
          <HFNumberInput
            label="reps"
            error={
              errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[rI]
                .weekProgression?.[rI].reps
            }
            fieldName={`days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.reps`}
            control={control}
            value={getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.reps`
            )}
            min={1}
            step={1}
            max={100}
          />
          <HFNumberInput
            label="rpe"
            error={
              errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[rI]
                .weekProgression?.[rI].rpe
            }
            fieldName={`days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.rpe`}
            control={control}
            value={getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.rpe`
            )}
            max={10}
            step={1}
          />
          <HFNumberInput
            label="percent"
            error={
              errors.days?.[dayIndex]?.workouts?.[workoutIndex].records?.[rI]
                .weekProgression?.[rI].percent
            }
            fieldName={`days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.percent`}
            control={control}
            value={getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.percent`
            )}
            min={1}
            step={5}
            max={100}
          />

          <ActionIcon variant="filled" color="red" onClick={() => remove(rI)}>
            <IconX />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            onClick={() =>
              append({
                sets: 5,
                reps: 5,
                percent: undefined,
                rpe: undefined,
              })
            }
          >
            <IconPlus />
          </ActionIcon>
        </Group>
      ))}
    </>
  );
}
