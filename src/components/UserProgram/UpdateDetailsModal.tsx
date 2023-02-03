import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import type { Program } from "@prisma/client";
import { useCallback, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { PROGRAM_CATEGORIES } from "../../constants/CreateProgram";
import type { WizardDetailsFormType } from "../../types/ProgramTypes";
import { WizardDetailsSchema } from "../../types/ProgramTypes";
import { api } from "../../utils/api";
import HFTextInput from "../ui/HFTexInput";
import HFTextarea from "../ui/HFTextarea";

type AddWorkoutModalProps = {
  program: Program & { categories: any };
};

export default function UpdateDetailsModal({ program }: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const utils = api.useContext();

  const programUpdate = api.program.updateProgramDetails.useMutation({
    onSettled(data) {
      utils.program.getById.invalidate(data?.id);
      handleClose();
    },
  });

  const {
    handleSubmit,
    register,
    control,
    getValues,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<WizardDetailsFormType>({
    defaultValues: {
      name: program.name,
      description: program.description ?? "",
      categories: program.categories,
    },
    resolver: zodResolver(WizardDetailsSchema.omit({ numWeeks: true })),
  });

  const submitForm: SubmitHandler<WizardDetailsFormType> = useCallback(
    async (data: WizardDetailsFormType, e) => {
      e?.preventDefault();
      try {
        programUpdate.mutate({
          id: program.id,
          schema: {
            name: data.name,
            description: data.description,
            categories: data.categories,
          },
        });
      } catch (err) {
        console.log("errors: ", err);
      }
    },
    []
  );

  function handleClose() {
    reset((formValues) => ({
      ...formValues,
    }));
    setOpened(false);
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
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
        <form onSubmit={handleSubmit(submitForm)}>
          <Stack>
            <HFTextInput
              label="Program Name"
              error={errors.name?.message}
              registerProps={register("name")}
            />
            <HFTextarea
              label="Description"
              error={errors.description?.message}
              registerProps={register("description")}
            />
            <Controller
              control={control}
              name="categories"
              render={({ field: { onChange, onBlur } }) => (
                <MultiSelect
                  data={PROGRAM_CATEGORIES}
                  label="Disciplines to be trained"
                  placeholder="Pick all relative"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.categories?.message}
                  value={getValues("categories")}
                />
              )}
            />

            <Button
              variant="filled"
              loading={isSubmitting}
              disabled={!isDirty}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Update Details</Button>
      </Group>
    </>
  );
}
