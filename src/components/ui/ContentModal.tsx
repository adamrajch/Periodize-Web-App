import type { ModalProps } from "@mantine/core";
import { Group, Modal, useMantineTheme } from "@mantine/core";

import type { FC, ReactNode } from "react";
import { useState } from "react";

type ContentModalProps = {
  children: ReactNode;
  Trigger: FC<{ onClick: () => void }>;
  handleClose: () => void;
};

export default function ContentModal({
  children,
  handleClose,
  Trigger,
  ...rest
}: ContentModalProps & Omit<ModalProps, "opened" | "closed" | "onClose">) {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <>
      <Modal
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
        transitionDuration={120}
        transitionTimingFunction="ease"
        size="lg"
        {...rest}
        opened={opened}
        onClose={() => {
          setOpened(false);
          handleClose();
        }}
      >
        {children}
      </Modal>

      <Group position="center">
        <Trigger onClick={() => setOpened(true)} />
      </Group>
    </>
  );
}
