import { ActionIcon, Group } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";

import { useFieldArray } from "react-hook-form";
import type { Control } from "react-hook-form/dist/types";
import type { WizardDaysFormType } from "../../../../types/ProgramTypes";
import HFTextInput from "../../../ui/HFTexInput";
import RecordsFieldArray from "./RecordsFieldArray";

type Props = {
  dayIndex: number;
  control: Control<WizardDaysFormType>;
  register: any;
  errors: any;
  addRecordToWorkout: (dayIndex: number, workoutIndex: number) => void;
};

export default function WorkoutsFieldArray({
  dayIndex,
  control,
  register,
  errors,
  addRecordToWorkout,
}: Props) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `days.${dayIndex}.workouts` as const,
  });

  return (
    <div>
      {fields.map((item, workoutIndex) => {
        return (
          <>
            <Group key={item.id}>
              <HFTextInput
                label={workoutIndex + 1}
                error={errors.days?.[dayIndex]?.workouts?.[workoutIndex].name}
                registerProps={register(
                  `days.${dayIndex}.workouts.${workoutIndex}.name`
                )}
                placeholder={`Workout ${workoutIndex + 1}`}
              />
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
            />
          </>
        );
      })}
    </div>
  );
}
