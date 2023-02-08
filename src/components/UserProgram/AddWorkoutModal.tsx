import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Autocomplete,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { Exercise } from "@prisma/client";
import { IconPlus, IconX } from "@tabler/icons";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import useSearchExercises from "../../hooks/useSearchExercises";
import type { WorkoutType } from "../../types/ProgramTypes";
import { SingleWorkout } from "../../types/ProgramTypes";
import HFTextInput from "../ui/HFTexInput";

type AddWorkoutModalProps = {
  addWorkouts: (exercise: WorkoutType) => void;
};

const WorkoutFormSchema = z.object({
  exercises: z.array(SingleWorkout),
  clusterName: z.string().max(20),
  clusterInterval: z.number().optional(),
});

type WorkoutFormType = z.infer<typeof WorkoutFormSchema>;

export function stopPropagate(callback: () => void) {
  return (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    callback();
  };
}

export default function AddWorkoutModal({ addWorkouts }: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { query, recordList, setQuery, resetQuery } = useSearchExercises();

  const { control, reset, getValues } = useForm<WorkoutFormType>({
    defaultValues: {
      exercises: [],
    },
    resolver: zodResolver(WorkoutFormSchema),
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "exercises",
  });

  function handleClose() {
    setOpened(false);
    resetQuery();
    reset();
  }

  const submitForm = useCallback(async (event) => {
    if (getValues("exercises").length > 1) {
      addWorkouts({
        type: "cluster",
        name: getValues("clusterName"),
        summary: "",
        exercises: getValues("exercises"),
      });
      handleClose();
    } else if (getValues("exercises").length === 1) {
      addWorkouts(getValues(`exercises.${0}`));
      handleClose();
    }
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => handleClose()}
        withCloseButton={false}
        centered
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        transition="fade"
        transitionDuration={200}
        transitionTimingFunction="ease"
      >
        {/* <form
          onSubmit={stopPropagate(handleSubmit(submitForm))}
          id="addWorkout"
        > */}
        <HFTextInput
          label="Search Lifts"
          placeholder="Squat"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        <Autocomplete
          value={query}
          onChange={(s) => {
            setQuery(s);
          }}
          label="Search Lifts"
          placeholder="Squat"
          data={recordList.map((e) => ({
            ...e,
            value: e.id,
          }))}
        />
        <Stack mt="sm" spacing={0}>
          {recordList?.map((exercise: Exercise) => (
            <Button
              key={exercise.id}
              onClick={() => {
                append({
                  type: "single",
                  exerciseId: exercise.id,
                  name: exercise.name,
                  load: exercise.load,
                  distance: exercise.distance,
                  time: exercise.time,
                  records: [
                    {
                      exerciseId: exercise.id,
                      sets: 5,
                      reps: 5,
                    },
                  ],
                });
                resetQuery();
                setQuery("");
              }}
              fullWidth
              radius={0}
              variant="outline"
            >
              {exercise.name}
            </Button>
          ))}
        </Stack>
        <Stack my="sm" spacing={4}>
          {fields.map((e, ei) => (
            <Group key={e.id} sx={{ border: "1px solid white" }} grow>
              <Text
                align="center"
                size={fields.length > 1 ? "sm" : "lg"}
                tt="capitalize"
              >
                {`${ei + 1} ${e.name}`}
              </Text>
              <ActionIcon variant="transparent" onClick={() => remove(ei)}>
                <IconX />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
        {fields.length ? (
          <Button fullWidth form="addWorkout" onClick={(e) => submitForm(e)}>
            {fields.length === 1 ? "Add Workout" : "Add Superset"}
          </Button>
        ) : null}
        {/* </form> */}
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          leftIcon={<IconPlus />}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
        >
          Exercise
        </Button>
      </Group>
    </>
  );
}
