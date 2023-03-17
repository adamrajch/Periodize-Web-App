import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Box, Button, Group, Menu, Tabs } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconDotsVertical,
  IconPlus,
  IconTool,
  IconTrash,
} from "@tabler/icons-react";
import { useCallback } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { useEditProgramStore } from "../../lib/slices/editProgramStore";

import type { WizardWeeksFormType } from "../../types/ProgramTypes";
import { WizardWeeksSchema } from "../../types/ProgramTypes";
import { api } from "../../utils/api";
import HFTextInput from "../ui/HFTexInput";
import DaySection from "./DaySection";

type EditFormProps = {
  id: string;
  template?: WizardWeeksFormType;
};

export default function EditProgramForm({ id, template }: EditFormProps) {
  const { weekIndex, setWeekIndex, dayIndex } = useEditProgramStore();
  const utils = api.useContext();
  const programUpdate = api.program.updateProgramTemplate.useMutation({
    onSettled() {
      utils.program.getById.invalidate(id);
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<WizardWeeksFormType>({
    defaultValues: {
      weeks: template?.weeks ? template.weeks : [],
    },
    resolver: zodResolver(WizardWeeksSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weeks",
  });

  const submitForm: SubmitHandler<WizardWeeksFormType> = useCallback(
    async (data: WizardWeeksFormType, e) => {
      e?.preventDefault();
      console.log("submitting edit form");
      programUpdate.mutate({
        id: id,
        template: { weeks: data.weeks },
      });
    },
    [id, programUpdate]
  );

  function deleteWeek(index: number) {
    if (fields.length === 1) {
      remove(index);
      reset({
        weeks: [
          {
            name: "Week 1",
            summary: "",
            days: [
              {
                name: "Day 1",
                summary: "",
                workouts: [],
              },
            ],
          },
        ],
      });
      return;
    } else if (fields.length - 1 === index) {
      setWeekIndex(weekIndex - 1);
      remove(index);
    } else {
      remove(index);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} id="editForm">
        <pre>{`Week-${weekIndex} Day-${dayIndex}`}</pre>
        <Tabs
          value={`${weekIndex}`}
          onTabChange={(val) => setWeekIndex(val ? parseInt(val) : 0)}
          orientation="vertical"
        >
          <Tabs.List my="xl">
            <ActionIcon
              onClick={() => append({ name: "", summary: "", days: [] })}
            >
              <IconPlus>Add Week</IconPlus>
            </ActionIcon>
            {fields.map((week, wI) => (
              <Tabs.Tab key={week.id} value={`${wI}`}>
                {wI + 1}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {fields.map((week, wI) => (
            <Tabs.Panel key={`panel ${week.id}`} value={`${wI}`}>
              <Box ml="xl">
                <Group position="center">
                  <HFTextInput
                    registerProps={register(`weeks.${wI}.name` as const)}
                    label={`Week ${wI + 1}`}
                    placeholder="Week Name"
                    error={errors.weeks?.[wI]?.name?.message}
                  />
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <ActionIcon>
                        <IconDotsVertical />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item icon={<IconTool size={14} />}>
                        Generate
                      </Menu.Item>
                      <Menu.Item icon={<IconDeviceFloppy size={14} />}>
                        Save as preset
                      </Menu.Item>

                      <Menu.Divider />

                      <Menu.Item
                        color="red"
                        icon={<IconTrash size={14} />}
                        onClick={() => deleteWeek(wI)}
                      >
                        Delete Week
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>

                <DaySection
                  control={control}
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  errors={errors}
                  wi={wI}
                />
              </Box>
            </Tabs.Panel>
          ))}
        </Tabs>

        <Group position="center">
          <Button
            type="submit"
            disabled={!isDirty}
            loading={isSubmitting}
            form="editForm"
          >
            Save
          </Button>
        </Group>

        <Group align="flex-start">
          {/* <pre>values: {JSON.stringify(watch(), null, 2)}</pre> */}
          {/* <pre> errors: {JSON.stringify(errors, null, 2)}</pre> */}
        </Group>
      </form>
    </>
  );
}
