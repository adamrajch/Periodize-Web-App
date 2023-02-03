import { Global } from "@mantine/core";

export default function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        body: {
          ...theme.fn.fontStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
        },

        " #__next": {
          minHeight: "100vh",
          height: "100%",
        },
        "#your-id > [data-active]": {
          backgroundColor: "pink",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      })}
    />
  );
}
