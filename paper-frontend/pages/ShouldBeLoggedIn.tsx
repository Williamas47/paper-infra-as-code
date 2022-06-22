import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useAuthFunctions } from "../auth";
import {
  LoginContainer,
  HomeContainer,
  LeftSide,
  RightSide,
  LoginButton,
} from "./ShouldBeLoggedIn.styles";
// import Image from "next/image";
// import BackgroundImage from "../public/background.jpg";

const ShouldBeLoggedIn = (): JSX.Element => {
  const { login } = useAuthFunctions();

  return (
    <HomeContainer>
      <LeftSide>
        <Typography variant="h1">Bem-vindo ao Paper Frontend!</Typography>
        <Typography variant="h6">
          Projeto criado para o desenvolvimento prático dos tópicos abordados no
          Paper da disciplina de Seminário Interdisciplinar: Tópicos Especiais
          (ADS103).
        </Typography>
        <Typography>
          Criado por William Almeida da Silveira, apresentado no paper
          entitulado{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.google.com/document/d/10ImIduEXASdC13Z7OffbFIn6x4mv-3MTwI7iHY-xg5s/edit?usp=sharing"
          >
            <strong>Desenvolvimento na Nuvem utilizando AWS CDK</strong>
          </a>
          .
        </Typography>
      </LeftSide>
      <RightSide>
        <LoginContainer>
          <Typography variant="h5"><strong>Para ter acesso à aplicação é necessário registrar-se</strong></Typography>
          <Typography>
            Ao criar uma conta, você tem acesso a um perfil pessoal onde é
            possivel enviar fotos que ficam visíveis em seu feed, e também
            utilizar a funcionalidade de procurar perfis onde é possível
            visualizar as fotos enviadas por outros usuários!
          </Typography>
          <LoginButton onClick={() => login()}>Login</LoginButton>
        </LoginContainer>
      </RightSide>
    </HomeContainer>
  );
};

export default ShouldBeLoggedIn;
