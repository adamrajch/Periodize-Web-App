import { ActionIcon, Group, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type { EditFormSectionProps } from "./DaySection";
import RecordSection from "./RecordSection";

export default function SingleWorkoutSection({
  control,
  getValues,
  errors,
  register,
  remove,
  workoutIndex,
  clusterIndex,
  exerciseIndex,
}: Omit<EditFormSectionProps, "setValue"> & {
  workoutIndex?: number;
  clusterIndex?: number;
  exerciseIndex?: number;
  remove: (index?: number | number[]) => void;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();
  const namePath =
    workoutIndex && !clusterIndex
      ? `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.name`
      : `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.name`;

  const inCluster = typeof clusterIndex === "number";

  const path = inCluster
    ? `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.name`
    : `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.`;

  return (
    <Group align="flex-start">
      <Text fw={500} fz="xl" tt="capitalize">
        {getValues(namePath)?.toString()}
        {JSON.stringify(clusterIndex, null, 2)}
        {JSON.stringify(exerciseIndex, null, 2)}
        {JSON.stringify(typeof workoutIndex, null, 2)}
      </Text>
      <ActionIcon
        onClick={() => {
          if (inCluster) {
            remove(exerciseIndex);
          } else {
            remove(workoutIndex);
          }
        }}
        color="blue"
      >
        <IconX />
      </ActionIcon>

      <RecordSection
        getValues={getValues}
        control={control}
        register={register}
        errors={errors}
        exerciseId={"id for now"}
        exerciseIndex={exerciseIndex}
        workoutIndex={workoutIndex ? workoutIndex : undefined}
        clusterIndex={clusterIndex ? clusterIndex : undefined}
      />
    </Group>
  );
}