import React from "react";
import { AppProps } from "next/app";
import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import Header from "./header";
import "./styles.css";
import { useAuth } from "../auth";

Amplify.configure({
  Auth: {
    region: process.env.AWS_REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,
    cookieStorage: {
      domain: process.env.AUTH_COOKIE_DOMAIN,
    },
  },
});

Auth.configure({
  oauth: {
    domain: process.env.IDP_DOMAIN,
    scope: ["email", "openid"],
    redirectSignIn: process.env.REDIRECT_SIGN_IN,
    redirectSignOut: process.env.REDIRECT_SIGN_OUT,
    responseType: "token",
  },
});

function App({ Component, pageProps }: AppProps) {
  const { initialAuth } = pageProps;
  const auth = useAuth(initialAuth);
  console.log(auth);
  let localStorageAuth;
  if (typeof window !== "undefined") {
    if (auth) {
      localStorage.setItem("USER_INFO", auth.accessTokenData.username);
    }
    localStorageAuth = localStorage.getItem("USER_INFO");
  }
  return (
    <>
      {(auth || localStorageAuth) && <Header {...pageProps} authData={auth} />}
      <Component {...pageProps} />
    </>
  );
}

export default App;
