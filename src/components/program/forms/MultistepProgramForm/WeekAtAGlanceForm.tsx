import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Grid, Group, Stack, Tabs } from "@mantine/core";
import type { Exercise } from "@prisma/client";
import { IconFileImport, IconPlus } from "@tabler/icons";

import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { DAYS_OF_WEEK } from "../../../../constants/CreateProgram";
import { useProgramWizardForm } from "../../../../lib/slices/createProgramWizard";
import type { WizardDaysFormType } from "../../../../types/ProgramTypes";
import { WizardDaysSchema } from "../../../../types/ProgramTypes";
import HFTextInput from "../../../ui/HFTexInput";
import AddWorkoutModal from "./AddLiftModal";
import WorkoutsFieldArray from "./WorkoutsFieldArray";

export default function WizardWeekAtAGlanceForm() {
  const updateForm = useProgramWizardForm((state) => state.updateAction);
  const contextForm = useProgramWizardForm((state) => state.form);
  const [activeTab, setActiveTab] = useState<string | null>("0");
  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WizardDaysFormType>({
    defaultValues: {
      days: DAYS_OF_WEEK.map(() => ({
        name: "",
        summary: "",
        workouts: [],
      })),
    },
    resolver: zodResolver(WizardDaysSchema),
  });

  const { fields } = useFieldArray({
    control,
    name: "days",
  });

  const router = useRouter();
  const submitForm: SubmitHandler<WizardDaysFormType> = useCallback(
    (data: WizardDaysFormType, e) => {
      e?.preventDefault();
      console.log("form data" + JSON.stringify(data, null, 2));
      // updateForm({ ...data });

      // router.push("/dashboard/create/days");
    },
    [updateForm, router]
  );

  function addSingleWorkout(index: number, exercise: Exercise) {
    setValue(`days.${index}.workouts`, [
      ...getValues().days[index].workouts,
      {
        ...exercise,
        type: "single",
        records: [
          {
            liftId: exercise.id,
            sets: 5,
            reps: 5,
            rpe: undefined,
            percent: undefined,
          },
        ],
      },
    ]);
  }

  // fix this
  function addRecordToWorkout(dayIndex: number, workoutIndex: number, record) {
    if (
      getValues(`days.${dayIndex}.workouts.${workoutIndex}.type` === "single")
    ) {
      setValue(`days.${dayIndex}.workouts.${workoutIndex}.records`, [
        ...getValues().days[index].workouts[workoutIndex]?.records,
        {
          ...record,
          type: "single",
          records: [
            {
              liftId: record.id,
              sets: 5,
              reps: 5,
              rpe: undefined,
              percent: undefined,
            },
          ],
        },
      ]);
    }
  }
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <>
      <h1>Renders: {renderCounter.current}</h1>
      <h1>Week Template</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <Tabs keepMounted={false} value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List>
            {DAYS_OF_WEEK.map((day, i) => (
              <Tabs.Tab key={day} value={`${i}`}>
                {day}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {fields.map((day, index) => (
            <Tabs.Panel key={day.id} value={`${index}`}>
              <Group>
                <HFTextInput
                  label={index + 1}
                  error={errors.days?.[index]?.name?.message}
                  registerProps={register(`days.${index}.name` as const)}
                  placeholder={`Day ${index + 1}`}
                />
                <ActionIcon variant="filled">
                  <IconFileImport />
                </ActionIcon>
                <ActionIcon variant="filled">
                  <IconPlus />
                </ActionIcon>
                <AddWorkoutModal addWorkout={addSingleWorkout} index={index} />
              </Group>
              <Grid>
                <WorkoutsFieldArray
                  {...{ control, register, errors }}
                  nestIndex={index}
                />
              </Grid>
            </Tabs.Panel>
          ))}
        </Tabs>
        <Stack>
          <pre>{JSON.stringify(contextForm, null, 2)}</pre>
          <pre>VALUES: {JSON.stringify(watch(), null, 2)}</pre>

          <Button onClick={() => reset()}>Reset</Button>
          <Button
            variant="filled"
            loading={isSubmitting}
            // disabled={!isValid}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}
