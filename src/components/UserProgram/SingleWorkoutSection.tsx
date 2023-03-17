import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Grid, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconDotsVertical,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import HFNumberInput from "../ui/HFNumberInput";
import type { EditFormSectionProps } from "./DaySection";

export default function SingleWorkoutSection({
  control,
  errors,
  removeWorkout,
  workoutIndex,
  id,
}: Omit<EditFormSectionProps, "setValue"> & {
  workoutIndex: number;
  id: string;
  removeWorkout: (index?: number | number[]) => void;
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
          <Stack>
            {fields.map((record, rI) => (
              <Grid key={record.id}>
                <Grid.Col span={1}>
                  {rI === 0 ? (
                    <Group noWrap>
                      <Text fw="bold">{record.exerciseName}</Text>
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon>
                            <IconDotsVertical />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            icon={<IconPlus size={14} />}
                            onClick={() => {
                              append({
                                exerciseName: record.exerciseName,
                                exerciseId: record.exerciseId,
                                sets: 3,
                                reps: 3,
                              });
                            }}
                          >
                            Add Record
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item
                            icon={<IconTrash size={14} />}
                            onClick={() => removeWorkout(workoutIndex)}
                          >
                            Remove Exercise
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  ) : null}
                </Grid.Col>
                <Grid.Col span={10}>
                  <Group grow noWrap>
                    <HFNumberInput
                      label="sets"
                      control={control}
                      error={
                        errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                          workoutIndex
                        ]?.records?.[rI]?.sets.message
                      }
                      fieldName={path + `.${rI}.sets`}
                      value={record.sets}
                      min={1}
                      step={1}
                    />
                    <HFNumberInput
                      label="reps"
                      error={
                        errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                          workoutIndex
                        ]?.records?.[rI].reps
                      }
                      fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.reps`}
                      control={control}
                      value={record.reps}
                      min={1}
                      step={1}
                      max={100}
                    />
                    <HFNumberInput
                      label="rpe"
                      error={
                        errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                          workoutIndex
                        ]?.records?.[rI].rpe
                      }
                      fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.rpe`}
                      control={control}
                      value={record.rpe}
                      max={10}
                      step={1}
                    />
                    <HFNumberInput
                      label="percent"
                      error={
                        errors.weeks?.[weekIndex]?.days?.[dayIndex]?.workouts?.[
                          workoutIndex
                        ]?.records?.[rI].percent
                      }
                      fieldName={`weeks.${weekIndex}.days.${dayIndex}.workouts.${workoutIndex}.records.${rI}.percent`}
                      control={control}
                      value={record.percent}
                      min={1}
                      step={5}
                      max={100}
                    />
                  </Group>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Group>
                    <ActionIcon onClick={() => removeRecord(rI)}>
                      <IconX />
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </div>
      )}
    </Draggable>
  );
}
