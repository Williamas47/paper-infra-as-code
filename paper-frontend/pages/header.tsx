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
  const placeholderProfilePic =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  return (
    <HeaderElement>
      <Button onClick={() => router.push("/procurar")}>Procurar perfis</Button>
      <LeftSideButtons>
        <UserProfileButton onClick={() => router.push(`/perfil/${currentUser}`)}>
          <img src={placeholderProfilePic} width="25" height="25" alt="imagem de perfil" />
          @{currentUser}
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
