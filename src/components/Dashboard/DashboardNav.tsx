import {
  createStyles,
  Group,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";

import type { TablerIcon } from "@tabler/icons";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import ColorSwitch from "../Global/ColorSwitch";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  href: string;
}

function NavbarLink({ icon: Icon, label, active, href }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Group position="center">
      <Tooltip label={label} position="right" transitionDuration={0}>
        <Link href={href}>
          <UnstyledButton
            className={cx(classes.link, { [classes.active]: active })}
          >
            <Icon stroke={1.5} />
          </UnstyledButton>
        </Link>
      </Tooltip>
    </Group>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", href: "/" },
  { icon: IconGauge, label: "Dashboard", href: "/dashboard" },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Analytics",
    href: "/dashboard/analytics",
  },
  { icon: IconCalendarStats, label: "Releases", href: "/dashboard/programs" },
  { icon: IconUser, label: "Account", href: "/dashboard/workouts" },
  { icon: IconSettings, label: "Settings", href: "/settings" },
];

export default function DashboardNav({ hidden }: { hidden: boolean }) {
  const router = useRouter();
  const links = mockdata.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={router.asPath === link.href}
    />
  ));

  return (
    <Navbar p="md" hiddenBreakpoint="sm" width={{ base: 100 }} hidden={hidden}>
      <Navbar.Section grow>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <ColorSwitch />
          <NavbarLink
            icon={IconSwitchHorizontal}
            label="Change account"
            href="#"
          />
          <NavbarLink icon={IconLogout} label="Logout" href="#" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
