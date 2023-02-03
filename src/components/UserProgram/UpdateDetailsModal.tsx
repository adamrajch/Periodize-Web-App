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
  program: Program;
};

export default function UpdateDetailsModal({ program }: AddWorkoutModalProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const utils = api.useContext();

  const programUpdate = api.program.updateProgram.useMutation({
    onSuccess() {
      setOpened(false);
    },
    onError(err) {
      alert(err);
    },
  });

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<WizardDetailsFormType>({
    defaultValues: {
      name: program.name,
      description: program.description ?? "",
      categories: program.categories,
      numWeeks: program.numWeeks,
    },
    resolver: zodResolver(WizardDetailsSchema),
  });

  const submitForm: SubmitHandler<WizardDetailsFormType> = useCallback(
    async (data: WizardDetailsFormType, e) => {
      e?.preventDefault();
      try {
        programUpdate.mutate({
          id: program.id,
          schema: {
            name: getValues("name"),
            description: getValues("description"),
            categories: getValues("categories"),
          },
        });
      } catch (err) {
        console.log("errors: ", err);
      }
    },
    []
  );

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
              disabled={!isValid}
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
