import type { Control } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";
import type { WizardWeeksFormType } from "../../types/ProgramTypes";
import HFTextInput from "../ui/HFTexInput";
import RecordSection from "./RecordSection";

export default function WorkoutSection({
  control,
  register,
  getValues,
  errors,
}: {
  control: Control<WizardWeeksFormType>;
  register: any;
  getValues: any;
  errors: any;
}) {
  const { weekIndex, dayIndex } = useEditProgramStore();
  const { fields } = useFieldArray({
    control,
    name: `weeks.${weekIndex}.days.${dayIndex}.workouts` as const,
  });

  return (
    <>
      {fields.map((workout, wI) => {
        if (workout.type === "single") {
          return (
            <div key={workout.id}>
              <HFTextInput
                label="Exercise"
                disabled
                value={getValues(
                  `weeks.${weekIndex}.days.${dayIndex}.workouts.${wI}.name`
                )}
              />
              <RecordSection
                getValues={getValues}
                control={control}
                register={register}
                errors={errors}
              />
            </div>
          );
        } else {
          return <div key={workout.id}>Cluster Workout</div>;
        }
      })}
    </>
  );
}
