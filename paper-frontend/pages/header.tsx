import React from "react";
import { useRouter } from "next/router";
import { AuthTokens, useAuthFunctions } from "../auth";
import {
  HeaderElement,
  LeftSideButtons,
  UserProfileButton,
  Button,
} from "./header.styles";

const Header: React.FC<{ authData: AuthTokens }> = ({
  authData,
}): JSX.Element => {
  const { logout } = useAuthFunctions();
  const router = useRouter();
  const currentUser = authData?.accessTokenData.username;
  return (
    <HeaderElement>
      <Button onClick={() => router.push("/procurar")}>Procurar perfis</Button>
      <LeftSideButtons>
        <UserProfileButton onClick={() => router.push(`/perfil/${currentUser}`)}>
          <img src="https://via.placeholder.com/25" alt="imagem de perfil" />
          {currentUser}
        </UserProfileButton>
        <Button onClick={() => logout()}>Sair</Button>
      </LeftSideButtons>
    </HeaderElement>
  );
};

// export const getServerSideProps: GetServerSideProps<{
//   initialAuth: AuthTokens;
// }> = async (context) => {
//   const initialAuth = getServerSideAuth(context.req);
//   return { props: { initialAuth } };
// };

export default Header;
