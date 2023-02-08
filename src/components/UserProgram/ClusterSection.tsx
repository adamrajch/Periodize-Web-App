import { ActionIcon, Group } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import HFNumberInput from "../ui/HFNumberInput";
import HFTextInput from "../ui/HFTexInput";
import type { EditFormSectionProps } from "./DaySection";
import SingleWorkoutSection from "./SingleWorkoutSection";

export default function ClusterSection({
  control,
  getValues,
  errors,
  register,
  remove,
  workoutIndex,
}: Omit<EditFormSectionProps, "setValue"> & {
  workoutIndex: number;
  remove: (index?: number | number[]) => void;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();

  const {
    fields,
    remove: deleteExercise,
    append,
  } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.exercises` as `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.exercises`,
  });

  return (
    <div>
      <Group position="center">
        <HFTextInput
          label="Superset Name"
          placeholder="yah yeet"
          registerProps={register(
            `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.name` as const
          )}
          error={
            errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
              workoutIndex
            ]?.message
          }
        />
        <HFNumberInput
          label="Interval"
          control={control}
          error={
            errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
              workoutIndex
            ]?.message
          }
          fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.interval`}
          value={getValues(
            `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.interval`
          )}
          min={1}
          step={1}
        />
        <ActionIcon>
          <IconPlus />
        </ActionIcon>
        <ActionIcon color="yellow" onClick={() => remove(workoutIndex)}>
          <IconX />
        </ActionIcon>
      </Group>

      {fields.map((exercise, ei) => (
        <SingleWorkoutSection
          key={exercise.id}
          getValues={getValues}
          control={control}
          register={register}
          errors={errors}
          clusterIndex={workoutIndex}
          exerciseIndex={ei}
          remove={deleteExercise}
        />
      ))}
    </div>
  );
}
