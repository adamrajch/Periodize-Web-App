import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Autocomplete,
  Button,
  Group,
  Modal,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import useSearchExercises from "../../hooks/useSearchExercises";
import type { WorkoutType } from "../../types/ProgramTypes";
import { SingleWorkout } from "../../types/ProgramTypes";

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
  const [activeTab, setActiveTab] = useState<string | null>("single");
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

  const submitForm = useCallback(async () => {
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
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List grow>
            <Tabs.Tab value="single">Add Exercise</Tabs.Tab>
            <Tabs.Tab value="cluster">Superset</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="single">
            <Autocomplete
              value={query}
              onChange={(s) => {
                setQuery(s);
              }}
              onItemSubmit={(exercise) => {
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
              label="Search Lifts"
              placeholder="Squat"
              data={recordList}
            />
          </Tabs.Panel>
          <Tabs.Panel value="cluster">Second panel</Tabs.Panel>
        </Tabs>

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
          <Button fullWidth form="addWorkout" onClick={() => submitForm()}>
            {fields.length === 1 ? "Add Workout" : "Add Superset"}
          </Button>
        ) : null}
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
