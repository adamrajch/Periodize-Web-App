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
import { PROGRAM_PERIODIZATION_STYLES } from "../../../../constants/CreateProgram";
import useSearchExercises from "../../../../hooks/useSearchExercises";
import type { SingleWorkoutType } from "../../../../types/ProgramTypes";
import { RecordSchema } from "../../../../types/ProgramTypes";
import HFTextInput from "../../../ui/HFTexInput";

type AddWorkoutModalProps = {
  addWorkout: (
    index: number,
    exercise: Pick<SingleWorkoutType, "exerciseId" | "name">
  ) => void;
  index: number;
};

const WorkoutFormSchema = z.object({
  periodization: z.enum(["none", "linear", "ungulating", "step", "custom"]),
  records: z.array(RecordSchema),
});

type WorkoutFormType = z.infer<typeof WorkoutFormSchema>;
export default function AddWorkoutModal({
  addWorkout,
  index,
}: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { query, recordList, setQuery, resetQuery } = useSearchExercises();

  const {
    control,
    formState: { errors },
  } = useForm<WorkoutFormType>({
    defaultValues: {
      periodization: "none",
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
            name="periodization"
            render={({ field: { onChange, onBlur } }) => (
              <NativeSelect
                data={PROGRAM_PERIODIZATION_STYLES}
                label="Disciplines to be trained"
                placeholder="Pick all relative"
                onChange={onChange}
                onBlur={onBlur}
                error={errors.periodization?.message}
              />
            )}
          />
        </Group>

        <div>
          {recordList?.map((exercise: Exercise) => (
            <Button
              key={exercise.id}
              onClick={() => {
                addWorkout(index, {
                  exerciseId: exercise.id,
                  name: exercise.name,
                }),
                  resetQuery(),
                  setOpened(false);
              }}
            >
              {exercise.name}
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

// const buttonRightSection = (
//   <Group>
//     <Kbd>Ctrl</Kbd>
//     <span style={{ margin: "0 5px" }}>+</span>
//     <Kbd>K</Kbd>
//   </Group>
// );
