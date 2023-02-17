import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useFieldArray } from "react-hook-form";
import ClusterSection from "./ClusterSection";
import type { EditFormSectionProps } from "./DaySection";
import SingleWorkoutSection from "./SingleWorkoutSection";

export default function WorkoutSection({
  control,
  register,
  getValues,
  errors,
  wi,
  di,
  setValue,
  removeWorkout,
}: EditFormSectionProps & {
  wi: number;
  di: number;
  removeWorkout: (index: number) => void;
}) {
  // const { weekIndex, dayIndex } = useEditProgramStore();
  const { fields, remove, swap, move, append } = useFieldArray({
    control,
    name: `weeks.${wi}.days.${di}.workouts` as "weeks.0.days.0.workouts",
  });

  function onDragEnd(result: DropResult) {
    const { source, destination, type, combine, draggableId } = result;
    console.log("source: ", source);
    console.log("destination: ", destination);
    console.log("type: ", type);
    console.log("draggableId: ", draggableId);
    console.log("combine: ", combine);

    if (!destination && !result.combine) {
      // remove(source.index);
      return;
    }

    if (result.combine && type === "WORKOUTS") {
      // setValue(`weeks.${wi}.days.${di}.workouts.${source.index}.exercises`, [
      //   ...getValues(
      //     `weeks.${wi}.days.${di}.workouts.${source.index}.exercises`
      //   ),
      //   getValues(`weeks.${wi}.days.${di}.workouts.${source.index}`),
      // ]);
      // removeWorkout(source.index);
      console.log("here");
    }

    if (
      destination?.index === source.index &&
      source?.droppableId === destination.droppableId
    ) {
      return;
    }

    if (type === "EXERCISES" && destination?.index !== undefined) {
      console.log("swapping exercises");
      const workoutId = draggableId.substring(draggableId.indexOf("wid:") + 4);
      console.log(workoutId);

      const arr = getValues(
        `weeks.${wi}.days.${di}.workouts.${parseInt(workoutId)}.exercises`
      );

      const el = arr[source.index];

      arr.splice(source.index, 1);
      arr.splice(destination.index, 0, el);

      setValue(
        `weeks.${wi}.days.${di}.workouts.${parseInt(workoutId)}.exercises`,
        arr
      );

      return;
    }

    if (type === "WORKOUTS") {
      console.log("moving workouts");
      if (destination) {
        move(source.index, destination.index);
      }
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="workout-section" type="WORKOUTS" isCombineEnabled>
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {fields.map((workout, wI) => {
              if (workout.type === "single") {
                return (
                  <SingleWorkoutSection
                    key={workout.id}
                    getValues={getValues}
                    control={control}
                    register={register}
                    errors={errors}
                    workoutIndex={wI}
                    removeWorkout={remove}
                    id={workout.id}
                  />
                );
              }
              if (workout.type === "cluster") {
                return (
                  <ClusterSection
                    key={workout.id}
                    getValues={getValues}
                    control={control}
                    register={register}
                    errors={errors}
                    workoutIndex={wI}
                    removeWorkout={remove}
                    wi={wi}
                    di={di}
                    index={wI}
                    id={workout.id}
                  />
                );
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
