import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Group,
  Modal,
  NativeSelect,
  useMantineTheme,
} from "@mantine/core";
import type { Exercise } from "@prisma/client";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import useSearchExercises from "../../../../hooks/useSearchExercises";
import { RecordSchema } from "../../../../types/ProgramTypes";
import HFTextInput from "../../../ui/HFTexInput";

type AddWorkoutModalProps = {
  addWorkout: (index: number, exercise: Exercise) => void;
  index: number;
};

const PROGRAM_PERIODIZATION_STYLES = [
  "none",
  "linear",
  "ungulating",
  "step",
  "custom",
];
const WorkoutFormSchema = z.object({
  programStyle: z.enum(["none", "linear", "ungulating", "step", "custom"]),
  records: z.array(RecordSchema),
});

type WorkoutFormType = z.infer<typeof WorkoutFormSchema>;
export default function AddWorkoutModal({
  addWorkout,
  index,
}: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { query, exercises, setQuery, resetQuery } = useSearchExercises();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<WorkoutFormType>({
    defaultValues: {
      programStyle: "none",
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
        <Group>
          <HFTextInput
            label="Search Lifts"
            placeholder="Squat"
            defaultValue={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
          <Controller
            control={control}
            name="programStyle"
            render={({ field: { onChange, onBlur } }) => (
              <NativeSelect
                data={PROGRAM_PERIODIZATION_STYLES}
                label="Disciplines to be trained"
                placeholder="Pick all relative"
                onChange={onChange}
                onBlur={onBlur}
                error={errors.programStyle?.message}
              />
            )}
          />
        </Group>

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
        <Button onClick={() => setOpened(true)}>Add Exercise</Button>
      </Group>
    </>
  );
}
