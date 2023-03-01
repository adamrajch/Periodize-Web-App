import {
  ActionIcon,
  Badge,
  Card,
  createStyles,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import type { Program, User } from "@prisma/client";
import { IconHeart, IconShare, IconShoppingBag } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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

export default function ProgramCard({
  program,
}: {
  program: Program & { author: User; createdAt: string };
}) {
  const { classes, theme } = useStyles();
  const { data } = useSession();
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
    <Card withBorder radius="md" className={classes.card} p={0}>
      <Card.Section
        sx={{ position: "relative", width: "100%", height: "150px", margin: 0 }}
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
        <Group position="apart" noWrap>
          <Stack spacing={0} sx={{ maxWidth: "75%" }}>
            <Link href={`/programs/${program.id}`} style={{ flex: 1 }}>
              <Text size="lg" weight={500} lineClamp={2}>
                {program.name} lksjdfklsdjfklsdkljsdf
              </Text>
            </Link>

            <Link href={`/authors/${program.authorId}`} style={{ flex: 1 }}>
              <Text className={classes.label} color="dimmed">
                {program.author.name}
              </Text>
            </Link>
          </Stack>
          <Text sx={{ flex: 1 }} color="dimmed">
            {program.createdAt}
          </Text>
        </Group>
        <Group mt="md">
          {program.categories.map((cat, ci) => (
            <Badge key={cat}>{cat}</Badge>
          ))}
        </Group>
      </Card.Section>

      <Group mt="xs" className={classes.section}>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconShare size={18} className={classes.like} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart size={18} className={classes.like} stroke={1.5} />
        </ActionIcon>

        <ActionIcon variant="default" radius="md" size={36}>
          <IconShoppingBag size={18} className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
