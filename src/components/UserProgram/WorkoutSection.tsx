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
}: Omit<EditFormSectionProps, "setValue">) {
  const { weekIndex, dayIndex } = useEditProgramStore();
  const { fields, remove } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts` as const,
  });

  return (
    <div>
      {getValues(`weeks.${weekIndex}.days.${dayIndex}.workouts`).length &&
        fields.map((workout: SingleWorkoutType | ClusterWorkoutType, wI) => {
          if (
            getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${wI}.type`
            ) === "single"
          ) {
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
            getValues(
              `weeks.${weekIndex}.days.${dayIndex}.workouts.${wI}.type`
            ) === "cluster"
          ) {
            return (
              <ClusterSection
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
        })}
    </div>
  );
}
