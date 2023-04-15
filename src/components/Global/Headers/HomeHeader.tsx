import {
  Burger,
  Button,
  Center,
  Container,
  Group,
  Header,
  Menu,
  Title,
  createStyles,
  rem,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links: { link: string; label: string }[];
  }[];
}

const HeaerLinks: HeaderActionProps = {
  links: [
    {
      link: "programs",
      label: "programs",
      links: [{ link: "sup", label: "sup" }],
    },
    {
      link: "learn",
      label: "learn",
      links: [{ link: "sup", label: "sup" }],
    },
    {
      link: "about",
      label: "about",
      links: [],
    },
    {
      link: "hello",
      label: "hey",
      links: [{ link: "sup", label: "sup" }],
    },
  ],
};
export function HomeHeader() {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = HeaerLinks.links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems.length) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Title>Periodize</Title>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <AuthShowcase />
      </Container>
    </Header>
  );
}
const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  console.log("sessionData: ", sessionData);
  return (
    <Group>
      <Link href="/dashboard/profile">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </Link>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </Group>
  );
};
