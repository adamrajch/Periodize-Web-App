import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Box, Group } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useFieldArray } from "react-hook-form";
import HFNumberInput from "../ui/HFNumberInput";
import HFTextInput from "../ui/HFTexInput";
import AddExerciseToClusterModal from "./AddExerciseToClusterModal";
import ClusterExerciseSection from "./ClusterExerciseSection";
import type { EditFormSectionProps } from "./DaySection";

export default function ClusterSection({
  control,
  getValues,
  errors,
  register,
  removeWorkout,
  workoutIndex,
  di,
  wi,
  id,
  index,
}: Omit<EditFormSectionProps, "setValue"> & {
  workoutIndex: number;
  di: number;
  wi: number;
  index: number;
  id: string;
  removeWorkout: (index?: number | number[]) => void;
}) {
  const {
    fields,
    remove: removeExercise,
    append,
  } = useFieldArray({
    control,
    name: `weeks.${wi}.days.${di}.workouts.${workoutIndex}.exercises` as `weeks.0.days.0.workouts.0.exercises`,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addExercisesToCluster(exercises: any) {
    for (let i = 0; i < exercises.length; i++) {
      append(exercises[i]);
    }
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ margin: "18px 0" }}
        >
          <Group position="center">
            <HFTextInput
              label="Superset Name"
              placeholder="Bench Row Superset"
              registerProps={register(
                `weeks.${wi}.days.${di}.workouts.${workoutIndex}.name` as const
              )}
              error={
                errors.weeks?.[wi]?.days?.[di]?.workouts?.[workoutIndex]
                  ?.message
              }
            />
            <HFNumberInput
              label="Interval"
              control={control}
              error={
                errors.weeks?.[wi]?.days?.[di]?.workouts?.[workoutIndex]
                  ?.message
              }
              fieldName={`weeks.${wi}.days.${di}.workouts.${workoutIndex}.interval`}
              value={getValues(
                `weeks.${wi}.days.${di}.workouts.${workoutIndex}.interval`
              )}
              min={1}
              step={1}
            />
            <AddExerciseToClusterModal
              addExercisesToCluster={addExercisesToCluster}
            />
            <ActionIcon
              color="yellow"
              onClick={() => removeWorkout(workoutIndex)}
            >
              <IconX />
            </ActionIcon>
          </Group>
          <Droppable
            droppableId="exercise-section"
            type="EXERCISES"
            isCombineEnabled
          >
            {(provided2, snapshot) => (
              <div ref={provided2.innerRef}>
                {fields.map((exercise, ei) => (
                  <Draggable
                    key={exercise.id}
                    draggableId={exercise.id}
                    index={ei}
                  >
                    {(provided3, snapshot) => (
                      <div
                        ref={provided3.innerRef}
                        {...provided3.draggableProps}
                        {...provided3.dragHandleProps}
                      >
                        <ClusterExerciseSection
                          key={exercise.exerciseId}
                          getValues={getValues}
                          control={control}
                          register={register}
                          errors={errors}
                          clusterIndex={workoutIndex}
                          exerciseIndex={ei}
                          exerciseId={exercise.exerciseId}
                          removeExercise={removeExercise}
                          wi={wi}
                          di={di}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided2.placeholder}
              </div>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
}
