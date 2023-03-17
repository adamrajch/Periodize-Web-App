import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";

import { useFieldArray } from "react-hook-form";
import type { Control } from "react-hook-form/dist/types";
import type {
  SingleWorkoutType,
  WizardDaysFormType,
} from "../../../../types/ProgramTypes";
import RecordsFieldArray from "./RecordsFieldArray";

type Props = {
  dayIndex: number;
  control: Control<WizardDaysFormType>;
  register: any;
  errors: any;
  addRecordToWorkout: (dayIndex: number, workoutIndex: number) => void;
  getValues: unknown;
};

export default function WorkoutsFieldArray({
  dayIndex,
  control,
  register,
  errors,
  addRecordToWorkout,
  getValues,
}: Props) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `days.${dayIndex}.workouts` as const,
  });

  return (
    <div>
      {fields.map((item, workoutIndex) => {
        return (
          <Stack key={item.id}>
            <Group>
              <Text>{item.name}</Text>
              <ActionIcon
                variant="filled"
                color="red"
                onClick={() => {
                  // add a record

                  addRecordToWorkout(dayIndex, workoutIndex);
                }}
              >
                <IconPlus />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                color="red"
                onClick={() => remove(workoutIndex)}
              >
                <IconX />
              </ActionIcon>
            </Group>
            <RecordsFieldArray
              {...{ control, register, errors }}
              workoutIndex={workoutIndex}
              dayIndex={dayIndex}
              workout={item as SingleWorkoutType}
              getValues={getValues}
            />
          </Stack>
        );
      })}
    </div>
  );
}
