import { ActionIcon, Group } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import HFNumberInput from "../ui/HFNumberInput";
import type { EditFormSectionProps } from "./DaySection";

export default function RecordSection({
  control,
  getValues,
  errors,
  exerciseId,
  clusterIndex,
  exerciseIndex,
  workoutIndex,
}: Omit<EditFormSectionProps, "setValue"> & {
  exerciseId: string;
  clusterIndex?: number;
  exerciseIndex?: number;
  workoutIndex?: number;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();
  const { fields, remove, append } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records` as const,
  });
  const path =
    typeof clusterIndex === "number"
      ? `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records`
      : `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records`;

  return (
    <div>
      <span>Hello</span>
      <pre>{JSON.stringify(fields, null, 2)}</pre>
      {fields.map((record, rI) => (
        <Group key={record.id}>
          <HFNumberInput
            label="sets"
            control={control}
            // error={
            //   errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
            //     workoutIndex
            //   ]?.records?.[rI]?.sets.message
            // }
            fieldName={path + `.${rI}.sets`}
            value={getValues(path + `.${rI}.sets`)}
            min={1}
            step={1}
          />
          <HFNumberInput
            label="reps"
            error={
              errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                workoutIndex
              ]?.records?.[rI].reps
            }
            fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.reps`}
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
              errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                workoutIndex
              ]?.records?.[rI].rpe
            }
            fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.rpe`}
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
              errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                workoutIndex
              ]?.records?.[rI].percent
            }
            fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.percent`}
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
                exerciseId: exerciseId,
              })
            }
          >
            <IconPlus />
          </ActionIcon>
        </Group>
      ))}
    </div>
  );
}
