import { Group, Stack, Tabs } from "@mantine/core";
import type {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { DAYS_OF_WEEK } from "../../constants/CreateProgram";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type {
  SingleWorkoutType,
  WizardWeeksFormType,
} from "../../types/ProgramTypes";

import HFTextInput from "../ui/HFTexInput";
import AddWorkoutModal from "./AddWorkoutModal";
import WorkoutSection from "./WorkoutSection";

export interface EditFormSectionProps {
  control: Control<WizardWeeksFormType>;
  getValues: UseFormGetValues<WizardWeeksFormType>;
  setValue: UseFormSetValue<WizardWeeksFormType>;
  errors: FieldErrors<WizardWeeksFormType>;
  register: UseFormRegister<WizardWeeksFormType>;
}

export default function DaySection({
  control,
  register,
  setValue,
  getValues,
  errors,
}: EditFormSectionProps) {
  const { weekIndex, dayIndex, setDayIndex } = useEditProgramStore();

  const { fields, append } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days` as const,
  });

  // TODO: FIX THIS FUNCTION
  function addWorkouts(
    exercises: Pick<SingleWorkoutType, "exerciseId" | "name">[]
  ) {
    if (exercises.length > 1) {
      setValue(`weeks.${weekIndex}.days.${dayIndex}.workouts`, [
        ...getValues(`weeks.${weekIndex}.days.${dayIndex}.workouts`),

        {
          type: "cluster",
          name: "",
          summary: "",
          lifts: exercises,
        },
      ]);
    }
  }

  return (
    <Tabs
      value={`${dayIndex}`}
      onTabChange={(val) => setDayIndex(val ? parseInt(val) : 0)}
      my="xl"
    >
      <Tabs.List grow position="center">
        {DAYS_OF_WEEK.map((day, dI) => (
          <Tabs.Tab key={day} value={`${dI}`}>
            {DAYS_OF_WEEK[dI]}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {fields.map((day, dI) => (
        <Tabs.Panel key={`day ${day.id}`} value={`${dI}`}>
          <Stack my="lg">
            <Group align="flex-end">
              <HFTextInput
                placeholder="Day Name"
                label="Day Name"
                registerProps={register(
                  `weeks.${weekIndex}.days.${dayIndex}.name`
                )}
              />
              <AddWorkoutModal
                addWorkouts={addWorkouts}
                // getValues={getValues}
              />
            </Group>
            <WorkoutSection
              getValues={getValues}
              control={control}
              register={register}
              errors={errors}
            />
          </Stack>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
