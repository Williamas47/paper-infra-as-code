import { Button } from "@material-ui/core";
import styled from "styled-components";
// import BackgroundImage from "../public/background1.jpg";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url("/newBackground.jpg");
  background-size: 100% auto;
  background-position: left;
  background-repeat: no-repeat;
  overflow: hidden;
`;
export const LeftSide = styled.div`
  // background-color: purple;
  width: 60vw;
  padding: 0 5%;
  padding-right: 10%;
  height: 100%;
  & > h1 {
    font-weight: bold;
    color: black;
    font-size: 3rem;
    margin-top: 4rem;
  }
  & > h6 {
    padding-top: 20px;
  }
  & > p > a {
    color: black;
    &:hover {
      color: blue;
    }
  }
`;
export const RightSide = styled.div`
  // background-color: orange;
  width: 40vw;
  height: 100%;

  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 10px solid #fad02c;
  padding: 10% 2%;
  text-align: center;
  box-sizing: border-box;
  // justify-content: center;
`;

export const LoginContainer = styled.div`
  & > h5 {
    border-bottom: 3px solid black;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;

export const LoginButton = styled(Button)`
width: 250px;
  padding: 10px 15px !important;
  background-color: #0000ff !important;
  color: #e9eaec !important;
  transition: 0.5s ease !important;
  &:hover {
    background-color: #fad02c !important;
    color: black !important;
  }
`;
