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
}: Omit<EditFormSectionProps, "setValue"> & {
  workoutIndex: number;
  remove: (index?: number | number[]) => void;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();

  return (
    <Group align="flex-start">
      <Text fw={500} fz="xl" tt="capitalize">
        {getValues(
          `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.name`
        )}
      </Text>
      <ActionIcon onClick={() => remove(workoutIndex)} color="blue">
        <IconX />
      </ActionIcon>

      <RecordSection
        getValues={getValues}
        control={control}
        register={register}
        errors={errors}
        exerciseId={"id for now"}
        workoutIndex={workoutIndex}
      />
    </Group>
  );
}
