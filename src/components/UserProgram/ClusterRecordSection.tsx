import { ActionIcon, Group } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import HFNumberInput from "../ui/HFNumberInput";
import type { EditFormSectionProps } from "./DaySection";

export default function ClusterRecordSection({
  control,
  getValues,
  errors,
  exerciseId,
  clusterIndex,
  exerciseIndex,
}: Omit<EditFormSectionProps, "setValue"> & {
  exerciseId: string;
  clusterIndex: number;
  exerciseIndex: number;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();
  //  "weeks.0.days.0.workouts.0.exercises.0.records";
  const { fields, remove, append } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records` as const,
  });
  const path = `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records`;
  return (
    <div>
      {fields.map((record, rI) => (
        <Group key={record.id}>
          <div>im here</div>
          <HFNumberInput
            label="sets"
            control={control}
            error={
              errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                clusterIndex
              ]?.exercises?.[exerciseIndex]?.records?.[rI].sets
            }
            fieldName={path + `.${rI}.sets`}
            value={getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${rI}.sets`
            )}
            min={1}
            step={1}
          />
          <HFNumberInput
            label="reps"
            error={
              errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                clusterIndex
              ]?.exercises?.[exerciseIndex]?.records?.[rI].reps
            }
            control={control}
            fieldName={path + `.${rI}.reps`}
            value={getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${rI}.reps`
            )}
            min={1}
            step={1}
            max={100}
          />
          <HFNumberInput
            label="rpe"
            error={
              errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                clusterIndex
              ]?.exercises?.[exerciseIndex]?.records?.[rI].rpe
            }
            control={control}
            fieldName={path + `.${rI}.rpe`}
            value={getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${rI}.rpe`
            )}
            max={10}
            step={1}
          />
          <HFNumberInput
            label="percent"
            error={
              errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                clusterIndex
              ]?.exercises?.[exerciseIndex]?.records?.[rI].percent
            }
            control={control}
            fieldName={path + `.${rI}.percent`}
            value={getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${rI}.percent`
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
