import { Stack } from "@mantine/core";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import ClusterSection from "./ClusterSection";
import type { EditFormSectionProps } from "./DaySection";
import SingleWorkoutSection from "./SingleWorkoutSection";

export default function WorkoutSection({
  control,
  register,
  getValues,
  errors,
  wi,
  di,
}: Omit<EditFormSectionProps, "setValue"> & { wi: number; di: number }) {
  const { weekIndex, dayIndex } = useEditProgramStore();
  const { fields, remove } = useFieldArray({
    control,
    name: `weeks.${wi}.days.${di}.workouts` as "weeks.0.days.0.workouts",
  });

  return (
    <Stack spacing="lg">
      {fields.map((workout, wI) => {
        if (workout.type === "single") {
          return (
            <SingleWorkoutSection
              key={workout.id}
              getValues={getValues}
              control={control}
              register={register}
              errors={errors}
              workoutIndex={wI}
              removeWorkout={remove}
            />
          );
        }
        if (workout.type === "cluster") {
          return (
            <ClusterSection
              key={workout.id}
              getValues={getValues}
              control={control}
              register={register}
              errors={errors}
              workoutIndex={wI}
              removeWorkout={remove}
              wi={wi}
              di={di}
            />
          );
        }
      })}
    </Stack>
  );
}
