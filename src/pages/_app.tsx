/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { getCookie, setCookie } from "cookies-next";
import { SessionProvider } from "next-auth/react";
import type { AppContext, AppProps } from "next/app";
import NextApp from "next/app";
import { useEffect, useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import { api } from "../utils/api";

const MyApp = (props: AppProps & { color: ColorScheme }) => {
  const { Component, color, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(color);
  console.log(pageProps);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme]);
  return (
    <SessionProvider session={pageProps?.session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
            primaryColor: "teal",
          }}
        >
          <GlobalStyles />
          <NotificationsProvider>
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    color: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
  };
};
// MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
//   // get color scheme from cookie
//   color: getCookie("mantine-color-scheme", ctx) || "dark",
// });
export default api.withTRPC(MyApp);
