import { ActionIcon, Group, NativeSelect, Stack } from "@mantine/core";
import { IconX } from "@tabler/icons";
import type { Control } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";
import { PROGRAM_PERIODIZATION_STYLES } from "../../../../constants/CreateProgram";
import type {
  SingleWorkoutType,
  WizardDaysFormType,
} from "../../../../types/ProgramTypes";
import WeekProgressionRecords from "./WeeklyProgressionRecords";

type RecordsFieldArrayProps = {
  dayIndex: number;
  workoutIndex: number;
  control: Control<WizardDaysFormType>;
  register: any;
  errors: any;
  workout: SingleWorkoutType;
  getValues: unknown;
};

export default function RecordsFieldArray({
  dayIndex,
  workoutIndex,
  control,
  errors,
  register,
  workout,
  getValues,
}: RecordsFieldArrayProps) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `days.${dayIndex}.workouts.${workoutIndex}.records` as const,
  });
  return (
    <div>
      {fields.map((record, rI) => (
        <Stack key={record.id}>
          <Group>
            <Controller
              control={control}
              name={`days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.periodization`}
              render={({ field: { onChange, onBlur } }) => (
                <NativeSelect
                  data={PROGRAM_PERIODIZATION_STYLES}
                  label="Select Periodization"
                  onChange={() => {
                    onChange(), console.log("hello");
                  }}
                  onBlur={onBlur}
                  error={errors.periodization?.message}
                />
              )}
            />

            <WeekProgressionRecords
              {...{ control, register, errors }}
              workoutIndex={workoutIndex}
              dayIndex={dayIndex}
              recordIndex={rI}
              workout={workout}
              getValues={getValues}
            />
            <ActionIcon variant="filled" color="red" onClick={() => remove(rI)}>
              <IconX />
            </ActionIcon>
          </Group>
        </Stack>
      ))}
    </div>
  );
}
