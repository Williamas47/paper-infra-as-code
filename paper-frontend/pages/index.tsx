// pages/index.tsx
import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { AuthTokens, useAuth, getServerSideAuth } from "../auth";
import ShouldBeLoggedIn from "./ShouldBeLoggedIn";
import App from "./App";

const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth);
  const router = useRouter();
  if (auth){ router.push(`/perfil/${auth.accessTokenData.username}`);}
  return (
    <>{auth ? <App /> : <ShouldBeLoggedIn />}</>
  );
};

export const getServerSideProps: GetServerSideProps<{
  initialAuth: AuthTokens;
}> = async (context) => {
  const initialAuth = getServerSideAuth(context.req);
  return { props: { initialAuth } };
};

export default Home;
