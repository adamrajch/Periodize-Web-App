import { Group, Text } from "@mantine/core";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type { EditFormSectionProps } from "./DaySection";
import RecordSection from "./RecordSection";

export default function WorkoutSection({
  control,
  register,
  getValues,
  errors,
}: Omit<EditFormSectionProps, "setValue">) {
  const { weekIndex, dayIndex } = useEditProgramStore();
  const { fields } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts` as const,
  });

  return (
    <>
      {fields.map((workout, wI) => {
        if (workout.type === "single") {
          return (
            <Group align="flex-start" key={workout.id}>
              <Text fw={500} fz="lg" tt="capitalize">
                {getValues(
                  `weeks.${weekIndex}.days.${dayIndex}.workouts.${wI}.name`
                )}
              </Text>
              {getValues(
                `weeks.${weekIndex}.days.${dayIndex}.workouts.${wI}.records`
              ) ? (
                <RecordSection
                  getValues={getValues}
                  control={control}
                  register={register}
                  errors={errors}
                  exerciseId={workout.exerciseId}
                />
              ) : null}
            </Group>
          );
        } else {
          return <div key={workout.id}>Cluster Workout</div>;
        }
      })}
    </>
  );
}
