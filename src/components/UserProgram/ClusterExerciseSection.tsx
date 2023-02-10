import { ActionIcon, Group, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import HFTextInput from "../ui/HFTexInput";
import type { EditFormSectionProps } from "./DaySection";

export default function ClusterExerciseSection({
  control,
  getValues,
  errors,
  register,
  remove,
  clusterIndex,
  exerciseIndex,
  exerciseId,
}: Omit<EditFormSectionProps, "setValue"> & {
  clusterIndex: number;
  exerciseIndex: number;
  exerciseId: string;
  remove: (index?: number | number[]) => void;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();

  const { fields, append } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records` as `weeks.0.days.0.workouts.0.exercises.0.records`,
  });
  return (
    <Group align="flex-start">
      <div>Im here</div>
      <Text fw={500} fz="xl" tt="capitalize">
        {getValues(
          `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.name`
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

      {fields.map((record, ri) => (
        // <ClusterRecordSection
        //   getValues={getValues}
        //   control={control}
        //   register={register}
        //   errors={errors}
        //   exerciseIndex={exerciseIndex}
        //   clusterIndex={clusterIndex}
        //   exerciseId={exerciseId}
        //   recordIndex={ri}
        // />
        // <HFNumberInput
        //   key={record.id}
        //   label="sets"
        //   control={control}
        //   error={
        //     errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
        //       clusterIndex
        //     ]?.exercises?.[exerciseIndex]?.records?.[ri].sets
        //   }
        //   fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${ri}.sets`}
        //   value={getValues(
        //     `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${ri}.sets`
        //   )}
        //   min={1}
        //   step={1}
        // />
        <HFTextInput
          key={record.id}
          label="sets"
          registerProps={register(
            `weeks.${weekIndex}.days.${dayIndex}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${ri}.sets`
          )}
        />
        // <div key={record.id}>record </div>
      ))}
    </Group>
  );
}
