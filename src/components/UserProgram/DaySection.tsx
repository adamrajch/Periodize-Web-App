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
  WizardWeeksFormType,
  WorkoutType,
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
  wi,
}: EditFormSectionProps & { wi: number }) {
  const { weekIndex, dayIndex, setDayIndex } = useEditProgramStore();

  const { fields, remove } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days` as "weeks.0.days",
  });

  function addWorkouts(exercise: WorkoutType) {
    setValue(`weeks.${weekIndex}.days.${dayIndex}.workouts`, [
      ...getValues(`weeks.${weekIndex}.days.${dayIndex}.workouts`),

      exercise,
    ]);
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

      {fields.map((day, di) => (
        <Tabs.Panel key={`day ${day.id}`} value={`${di}`}>
          <Stack my="lg">
            <Group align="flex-end">
              <HFTextInput
                placeholder="Day Name"
                label="Day Name"
                registerProps={register(`weeks.${wi}.days.${di}.name` as const)}
              />
              <AddWorkoutModal addWorkouts={addWorkouts} />
            </Group>

            <WorkoutSection
              getValues={getValues}
              control={control}
              register={register}
              errors={errors}
              wi={wi}
              di={di}
              setValue={setValue}
              removeWorkout={remove}
            />
          </Stack>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
