import { ActionIcon, Group } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";

import { useFieldArray } from "react-hook-form";
import type { Control } from "react-hook-form/dist/types";
import type { WizardDaysFormType } from "../../../../types/ProgramTypes";
import HFTextInput from "../../../ui/HFTexInput";
import RecordsFieldArray from "./RecordsFieldArray";

type Props = {
  nestIndex: number;
  control: Control<WizardDaysFormType>;
  register: any;
  errors: any;
};

export default function WorkoutsFieldArray({
  nestIndex,
  control,
  register,
  errors,
}: Props) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `days.${nestIndex}.workouts`,
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <>
            <Group key={item.id}>
              <HFTextInput
                label={k + 1}
                error={errors.days?.[nestIndex]?.workouts?.[k].name}
                registerProps={register(`days.${nestIndex}.workouts.${k}.name`)}
                placeholder={`Workout ${k + 1}`}
              />
              <ActionIcon
                variant="filled"
                color="red"
                onClick={() => {
                  // add a record
                  append({
                    name: "",
                    type: "single",
                    records: [],
                  });
                }}
              >
                <IconPlus />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                color="red"
                onClick={() => remove(k)}
              >
                <IconX />
              </ActionIcon>
            </Group>
            <RecordsFieldArray
              {...{ control, register, errors }}
              workoutIndex={k}
              dayIndex={nestIndex}
            />
          </>
        );
      })}
    </div>
  );
}
