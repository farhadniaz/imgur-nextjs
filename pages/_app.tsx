import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { AppProps, AppContext } from "next/app";

import { wrapper } from "../store";
import userAgentParser from "~/utils/user-agent-parser";
import AppActions from "~/store/app/actions";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();


  const setDeiceWidth = () => {
    store.dispatch({
      type: AppActions.SET_DEVICE_WIDTH,
      payload: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDeiceWidth);
    return () => window.removeEventListener("resize", setDeiceWidth);
  });

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const { store } = ctx;
  const { dispatch } = store;

  if (!process.browser) {
    let userAgentParsed = userAgentParser(ctx);
    dispatch({
      type: AppActions.SET_DEVICE,
      payload: userAgentParsed.device,
    });
  }

  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      // Some custom thing for all pages
      appProp: ctx.pathname,
    },
  };
};

export default wrapper.withRedux(MyApp);