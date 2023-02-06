import { Group, Stack } from "@mantine/core";
import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type {
  SingleWorkoutType,
  WizardWeeksFormType,
} from "../../types/ProgramTypes";

import HFTextInput from "../ui/HFTexInput";
import AddWorkoutModal from "./AddWorkoutModal";
import WorkoutSection from "./WorkoutSection";

export default function DaySection({
  control,
  register,
  setValue,
  getValues,
  errors,
}: {
  control: Control<WizardWeeksFormType>;
  register: any;
  setValue: unknown;
  // setValue: (name: string, value: unknown, config?: object) => void;
  // getValues: (payload?: string | string[]) => object;
  getValues: unknown;
  errors: any;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();

  const { fields, append } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days` as const,
  });

  function addSingleWorkout(
    exercise: Pick<SingleWorkoutType, "exerciseId" | "name">
  ) {
    setValue(`weeks.${weekIndex}.days.${dayIndex}.workouts`, [
      ...getValues(`weeks.${weekIndex}.days.${dayIndex}.workouts`),
      {
        ...exercise,
        type: "single",
        records: [
          {
            sets: 5,
            reps: 5,
            rpe: undefined,
            percent: undefined,
          },
        ],
      },
    ]);
  }
  return (
    <Stack my="lg">
      <Group>
        <HFTextInput
          placeholder="Day Name"
          label="Day Name"
          registerProps={register(`weeks.${weekIndex}.days.${dayIndex}.name`)}
        />
        <AddWorkoutModal
          addSingleWorkout={addSingleWorkout}
          getValues={getValues}
        />
      </Group>
      <WorkoutSection
        getValues={getValues}
        control={control}
        register={register}
        errors={errors}
      />
    </Stack>
  );
}
