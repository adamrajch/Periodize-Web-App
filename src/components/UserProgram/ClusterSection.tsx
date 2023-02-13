import { ActionIcon, Group } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useFieldArray } from "react-hook-form";
import HFNumberInput from "../ui/HFNumberInput";
import HFTextInput from "../ui/HFTexInput";
import ClusterExerciseSection from "./ClusterExerciseSection";
import type { EditFormSectionProps } from "./DaySection";

export default function ClusterSection({
  control,
  getValues,
  errors,
  register,
  removeWorkout,
  workoutIndex,
  di,
  wi,
}: Omit<EditFormSectionProps, "setValue"> & {
  workoutIndex: number;
  di: number;
  wi: number;
  removeWorkout: (index?: number | number[]) => void;
}) {
  const { fields, remove: removeExercise } = useFieldArray({
    control,
    name: `weeks.${wi}.days.${di}.workouts.${workoutIndex}.exercises` as `weeks.0.days.0.workouts.0.exercises`,
  });

  return (
    <div>
      <Group position="center">
        <HFTextInput
          label="Superset Name"
          placeholder="Bench Row Superset"
          registerProps={register(
            `weeks.${wi}.days.${di}.workouts.${workoutIndex}.name` as const
          )}
          error={
            errors.weeks?.[wi]?.days?.[di]?.workouts?.[workoutIndex]?.message
          }
        />
        <HFNumberInput
          label="Interval"
          control={control}
          error={
            errors.weeks?.[wi]?.days?.[di]?.workouts?.[workoutIndex]?.message
          }
          fieldName={`weeks.${wi}.days.${di}.workouts.${workoutIndex}.interval`}
          value={getValues(
            `weeks.${wi}.days.${di}.workouts.${workoutIndex}.interval`
          )}
          min={1}
          step={1}
        />

        <ActionIcon color="yellow" onClick={() => removeWorkout(workoutIndex)}>
          <IconX />
        </ActionIcon>
      </Group>
      <div>exercises : {fields.length} </div>
      {fields.map((exercise, ei) => (
        <ClusterExerciseSection
          key={exercise.exerciseId}
          getValues={getValues}
          control={control}
          register={register}
          errors={errors}
          clusterIndex={workoutIndex}
          exerciseIndex={ei}
          exerciseId={exercise.exerciseId}
          removeExercise={removeExercise}
          wi={wi}
          di={di}
        />
      ))}
    </div>
  );
}
