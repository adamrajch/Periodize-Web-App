import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import useSearchExercises from "../../hooks/useSearchExercises";
import type { SingleWorkoutType } from "../../types/ProgramTypes";
import { SingleWorkout } from "../../types/ProgramTypes";
import HFTextInput from "../ui/HFTexInput";

type AddWorkoutModalProps = {
  addExercisesToCluster: (exercises: SingleWorkoutType[]) => void;
};

const WorkoutFormSchema = z.object({
  exercises: z.array(SingleWorkout),
});

type WorkoutFormType = z.infer<typeof WorkoutFormSchema>;

export function stopPropagate(callback: () => void) {
  return (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    callback();
  };
}

export default function AddExerciseToClusterModal({
  addExercisesToCluster,
}: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();
  const { query, exerciseList, setQuery, resetQuery } = useSearchExercises();

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

  const handleClose = useCallback(() => {
    setOpened(false);
    resetQuery();
    reset();
  }, [reset, resetQuery]);

  const submitForm = useCallback(async () => {
    addExercisesToCluster(getValues("exercises"));
    handleClose();
  }, [addExercisesToCluster, getValues, handleClose]);

  function AddExercisesButton() {
    if (getValues("exercises").length < 1) {
      return <Button disabled>Add to Superset</Button>;
    }

    return (
      <Button
        onClick={() => {
          submitForm();
        }}
        disabled={getValues("exercises").length < 1}
      >
        Add Superset{" "}
        {fields.length > 1 ? `(${getValues("exercises").length})` : null}
      </Button>
    );
  }
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
        padding={0}
        size="lg"
      >
        <Box p="md">
          <Group position="apart">
            <Text>Add Exercises</Text>
            <AddExercisesButton />
          </Group>
          <HFTextInput
            label="Search Lifts"
            placeholder="Squat"
            value={query}
            onChange={(e) => {
              setQuery(e.currentTarget.value);
            }}
            rightSection={
              query.length ? (
                <ActionIcon onClick={() => setQuery("")}>
                  <IconX />
                </ActionIcon>
              ) : null
            }
          />
        </Box>

        <Stack my="sm" spacing={0}>
          {exerciseList.map((exercise) => (
            <UnstyledButton
              key={exercise.id}
              p="md"
              sx={{
                backgroundColor: getValues("exercises").find(
                  (e) => e.exerciseId === exercise.id
                )
                  ? "green"
                  : "",
                borderBottom: "2px solid black",
              }}
              onClick={() => {
                const i = getValues("exercises").findIndex(
                  (e) => e.exerciseId === exercise.id
                );
                if (i > -1) {
                  remove(i);
                } else {
                  append({
                    type: "single",
                    exerciseId: exercise.id,
                    name: exercise.name,
                    load: exercise.load,
                    distance: exercise.distance,
                    time: exercise.time,
                    records: [
                      {
                        exerciseName: exercise.name,
                        exerciseId: exercise.id,
                        sets: 5,
                        reps: 5,
                      },
                    ],
                  });
                }
              }}
            >
              <Group>
                <Stack>
                  <Text align="center" size="lg" tt="capitalize" fw="bold">
                    {exercise.name}
                  </Text>
                  {exercise.categories.map((c) => (
                    <Text key={c} c="dimmed" component="span">
                      {c}
                    </Text>
                  ))}
                </Stack>
              </Group>
            </UnstyledButton>
          ))}
        </Stack>
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          leftIcon={<IconPlus />}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
        ></Button>
      </Group>
    </>
  );
}
