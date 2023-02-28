import {
  ActionIcon,
  Button,
  Card,
  createStyles,
  Group,
  Text,
} from "@mantine/core";
import type { Program } from "@prisma/client";
import { IconHeart } from "@tabler/icons";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: 0,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export default function ProgramCard({ program }: { program: Program }) {
  const { classes, theme } = useStyles();

  // const features = badges.map((badge) => (
  //   <Badge
  //     color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
  //     key={badge.label}
  //     leftSection={badge.emoji}
  //   >
  //     {badge.label}
  //   </Badge>
  // ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section
        sx={{ position: "relative", width: "100%", height: "250px", margin: 0 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
          alt={program.name}
          fill
          style={{ objectFit: "cover", top: 0, left: 0 }}
          sizes="100%"
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {program.name}
          </Text>
          {/* <Badge size="sm">{country}</Badge> */}
        </Group>
        <Text size="sm" mt="xs">
          {program.description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} color="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group spacing={7} mt={5}>
          {/* {features} */}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart size={18} className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
