import { ActionIcon, Grid, Group, Menu, Stack, Text } from "@mantine/core";
import { IconDotsVertical, IconPlus, IconTrash, IconX } from "@tabler/icons";
import { useFieldArray } from "react-hook-form";
import HFNumberInput from "../ui/HFNumberInput";
import type { EditFormSectionProps } from "./DaySection";

export default function ClusterExerciseSection({
  control,
  getValues,
  errors,
  register,
  removeExercise,
  clusterIndex,
  exerciseIndex,
  exerciseId,
  di,
  wi,
}: Omit<EditFormSectionProps, "setValue"> & {
  clusterIndex: number;
  exerciseIndex: number;
  exerciseId: string;
  wi: number;
  di: number;
  removeExercise: (index?: number | number[]) => void;
}) {
  const {
    fields,
    remove: removeRecord,
    append,
  } = useFieldArray({
    control,
    name: `weeks.${wi}.days.${di}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records` as "weeks.0.days.0.workouts.0.exercises.0.records",
  });

  const path = `weeks.${wi}.days.${di}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records`;
  return (
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
                          exerciseId: exerciseId,
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
                      onClick={() => removeExercise(exerciseIndex)}
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
                fieldName={path + `.${rI}.sets`}
                value={getValues(
                  `weeks.${wi}.days.${di}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${rI}.sets`
                )}
                min={1}
                step={1}
              />
              <HFNumberInput
                label="reps"
                control={control}
                fieldName={path + `.${rI}.reps`}
                value={getValues(
                  `weeks.${wi}.days.${di}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${rI}.reps`
                )}
                min={1}
                step={1}
                max={100}
              />
              <HFNumberInput
                label="rpe"
                control={control}
                fieldName={path + `.${rI}.rpe`}
                value={getValues(
                  `weeks.${wi}.days.${di}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${rI}.rpe`
                )}
                max={10}
                step={1}
              />
              <HFNumberInput
                label="percent"
                control={control}
                fieldName={path + `.${rI}.percent`}
                value={getValues(
                  `weeks.${wi}.days.${di}.workouts.${clusterIndex}.exercises.${exerciseIndex}.records.${rI}.percent`
                )}
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
  );
}
