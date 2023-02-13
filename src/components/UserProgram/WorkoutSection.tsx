import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type {
  ClusterWorkoutType,
  SingleWorkoutType,
} from "../../types/ProgramTypes";
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
    <div>
      {fields.map((workout: SingleWorkoutType | ClusterWorkoutType, wI) => {
        if (workout.type === "single") {
          return (
            <SingleWorkoutSection
              key={`workout ${wI}`}
              getValues={getValues}
              control={control}
              register={register}
              errors={errors}
              workoutIndex={wI}
              remove={remove}
            />
          );
        }
        if (
          getValues(`weeks.${wi}.days.${di}.workouts.${wI}.type`) === "cluster"
        ) {
          return (
            <ClusterSection
              key={`workout ${wI}`}
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
    </div>
  );
}
