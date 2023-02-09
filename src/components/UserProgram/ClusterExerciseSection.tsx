import { ActionIcon, Group, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type { EditFormSectionProps } from "./DaySection";

export default function ClusterExerciseSection({
  control,
  getValues,
  errors,
  register,
  remove,
  workoutIndex,
  exerciseIndex,
}: Omit<EditFormSectionProps, "setValue"> & {
  workoutIndex: number;
  exerciseIndex: number;
  remove: (index?: number | number[]) => void;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();

  return (
    <Group align="flex-start">
      <Text fw={500} fz="xl" tt="capitalize">
        {getValues(
          `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.exercises.${exerciseIndex}.name`
        )}
      </Text>
      <ActionIcon
        onClick={() => {
          remove(exerciseIndex);
        }}
        color="blue"
      >
        <IconX />
      </ActionIcon>

      {/* <RecordSection
        getValues={getValues}
        control={control}
        register={register}
        errors={errors}
        exerciseId={"id for now"}
        exerciseIndex={exerciseIndex}
        workoutIndex={workoutIndex ? workoutIndex : undefined}
        clusterIndex={clusterIndex ? clusterIndex : undefined}
      /> */}
    </Group>
  );
}
