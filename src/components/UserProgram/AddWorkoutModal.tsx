import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Modal, Stack, useMantineTheme } from "@mantine/core";
import type { Exercise } from "@prisma/client";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import useSearchExercises from "../../hooks/useSearchExercises";
import type { SingleWorkoutType } from "../../types/ProgramTypes";
import { RecordSchema } from "../../types/ProgramTypes";
import HFTextInput from "../ui/HFTexInput";

type AddWorkoutModalProps = {
  addSingleWorkout: (
    exercise: Pick<SingleWorkoutType, "exerciseId" | "name">
  ) => void;
};

const WorkoutFormSchema = z.object({
  records: z.array(RecordSchema),
});

type WorkoutFormType = z.infer<typeof WorkoutFormSchema>;
export default function AddWorkoutModal({
  addSingleWorkout,
}: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { query, recordList, setQuery, resetQuery } = useSearchExercises();

  const {
    control,
    formState: { errors },
  } = useForm<WorkoutFormType>({
    defaultValues: {
      records: [],
    },
    resolver: zodResolver(WorkoutFormSchema),
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "records",
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
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
          defaultValue={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />

        <Stack my="sm" spacing={0}>
          {recordList?.map((exercise: Exercise) => (
            <Button
              key={exercise.id}
              onClick={() => {
                addSingleWorkout({
                  exerciseId: exercise.id,
                  name: exercise.name,
                }),
                  resetQuery(),
                  setOpened(false);
              }}
              fullWidth
              radius={0}
              variant="outline"
            >
              {exercise.name}
            </Button>
          ))}
        </Stack>
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
