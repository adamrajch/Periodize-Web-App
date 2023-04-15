import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Button, Grid, Group, Stack } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type { SingleWorkoutType } from "../../types/ProgramTypes";
import HFNumberInput from "../ui/HFNumberInput";
import type { EditFormSectionProps } from "./DaySection";
import WorkoutGenerationModal from "./WorkoutGenerationModal";

export default function SingleWorkoutSection({
  control,
  errors,
  removeWorkout,
  workoutIndex,
  id,
  workout,
  getValues,
}: Omit<EditFormSectionProps, "setValue"> & {
  workoutIndex: number;
  id: string;
  removeWorkout: (index?: number | number[]) => void;
  workout: SingleWorkoutType;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();

  const {
    fields,
    remove: removeRecord,
    append,
  } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records` as "weeks.0.days.0.workouts.0.records",
  });

  const path = `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records`;

  return (
    <Draggable draggableId={id} index={workoutIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Group align="flex-start">
            <Stack spacing="xs">
              {/* <SingleWorkoutModal
                workout={workout}
                getFormValues={getValues}
                removeWorkout={removeWorkout}
                workoutIndex={workoutIndex}
                formControl={control}
              /> */}

              <WorkoutGenerationModal
                workout={workout}
                getFormValues={getValues}
                removeWorkout={removeWorkout}
                workoutIndex={workoutIndex}
                formControl={control}
              />
              <Button
                compact
                size="xs"
                onClick={() =>
                  append({
                    exerciseId: workout.exerciseId,
                    sets: 5,
                    reps: 5,
                    exerciseName: workout.name,
                    rpe: undefined,
                    percent: undefined,
                  })
                }
              >
                <IconPlus size="16" />
              </Button>
            </Stack>
            <Stack spacing="xs">
              {fields.map((record, rI) => (
                <Grid key={record.id}>
                  <Grid.Col span={11}>
                    <Group grow noWrap>
                      <HFNumberInput
                        label="sets"
                        control={control}
                        error={
                          errors.weeks?.[weekIndex]?.days?.[dayIndex]
                            ?.workouts?.[workoutIndex]?.records?.[rI]?.sets
                            .message
                        }
                        fieldName={path + `.${rI}.sets`}
                        value={getValues(
                          `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.sets`
                        )}
                        min={1}
                        step={1}
                      />
                      <HFNumberInput
                        label="reps"
                        error={
                          errors.weeks?.[weekIndex]?.days?.[dayIndex]
                            ?.workouts?.[workoutIndex]?.records?.[rI].reps
                        }
                        fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.reps`}
                        control={control}
                        value={getValues(
                          `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.reps`
                        )}
                        min={1}
                        step={1}
                        max={100}
                      />
                      <HFNumberInput
                        label="rpe"
                        error={
                          errors.weeks?.[weekIndex]?.days?.[dayIndex]
                            ?.workouts?.[workoutIndex]?.records?.[rI].rpe
                        }
                        fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.rpe`}
                        control={control}
                        value={getValues(
                          `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.rpe`
                        )}
                        max={10}
                        step={1}
                      />
                      <HFNumberInput
                        label="percent"
                        error={
                          errors.weeks?.[weekIndex]?.days?.[dayIndex]
                            ?.workouts?.[workoutIndex]?.records?.[rI].percent
                        }
                        fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.percent`}
                        control={control}
                        value={getValues(
                          `weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.percent`
                        )}
                        min={1}
                        step={5}
                        max={100}
                      />
                    </Group>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <Group align="flex-end" h="100%">
                      <ActionIcon
                        onClick={() => {
                          fields.length > 1
                            ? removeRecord(rI)
                            : removeWorkout(workoutIndex);
                        }}
                      >
                        <IconX />
                      </ActionIcon>
                    </Group>
                  </Grid.Col>
                </Grid>
              ))}
            </Stack>
          </Group>
        </div>
      )}
    </Draggable>
  );
}
