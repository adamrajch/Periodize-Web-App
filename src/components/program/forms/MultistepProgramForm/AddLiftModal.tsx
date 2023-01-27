import { Button, Group, Modal, useMantineTheme } from "@mantine/core";
import type { Exercise } from "@prisma/client";
import { useState } from "react";
import useSearchExercises from "../../../../hooks/useSearchExercises";
import HFTextInput from "../../../ui/HFTexInput";

type AddWorkoutModalProps = {
  addWorkout: (index: number, exercise: Exercise) => void;
  index: number;
};
export default function AddWorkoutModal({
  addWorkout,
  index,
}: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { query, exercises, setQuery, resetQuery } = useSearchExercises();
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
        <div>
          {exercises?.map((lift) => (
            <Button
              key={lift.id}
              onClick={() => {
                addWorkout(index, lift), resetQuery(), setOpened(false);
              }}
            >
              {lift.name}
            </Button>
          ))}
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}
