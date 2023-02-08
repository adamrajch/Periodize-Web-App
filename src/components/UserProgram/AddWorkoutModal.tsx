import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { Exercise } from "@prisma/client";
import { IconPlus, IconX } from "@tabler/icons";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import useSearchExercises from "../../hooks/useSearchExercises";
import type { SingleWorkoutType } from "../../types/ProgramTypes";
import HFTextInput from "../ui/HFTexInput";

type AddWorkoutModalProps = {
  addWorkouts: (
    exercise: Pick<SingleWorkoutType, "exerciseId" | "name">[]
  ) => void;
};

const WorkoutFormSchema = z.object({
  exercises: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      load: z.boolean(),
      distance: z.boolean(),
      time: z.boolean(),
      categories: z.array(z.string()),
    })
  ),
});

type WorkoutFormType = z.infer<typeof WorkoutFormSchema>;
export default function AddWorkoutModal({ addWorkouts }: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { query, recordList, setQuery, resetQuery } = useSearchExercises();

  const { control, reset, watch } = useForm<WorkoutFormType>({
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
        <HFTextInput
          label="Search Lifts"
          placeholder="Squat"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />

        <Stack mt="sm" spacing={0}>
          {recordList?.map((exercise: Exercise) => (
            <Button
              key={exercise.id}
              onClick={() => {
                // addSingleWorkout({
                //   exerciseId: exercise.id,
                //   name: exercise.name,
                // }),

                //   setOpened(false);
                append({
                  ...exercise,
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
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </Stack>

        {fields.length === 1 && <Button fullWidth>Add Single Lift</Button>}
        {fields.length > 1 && <Button fullWidth>Add Superset</Button>}
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
