import styled from "styled-components";
import { Button, Dialog } from "@material-ui/core";

export const ModalContainer = styled(Dialog)`
  width: 90%;
  max-width: unset;
  margin: 0 auto;
  box-sizing: border-box;
  & > div {
    & > div {
      width: 50%;
      // height: 60%;
      padding: 0px 50px;
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      & > button {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
`;


export const ConfirmButton = styled(Button)`
  position: inherit !important;
  width: 150px !important;
  background-color: #0000ff !important;
  color: #e9eaec !important;
  margin-bottom: 20px !important;
  transition: 0.5s ease !important;
  &:hover {
    background-color: #fad02c !important;
    color: black !important;
  }
  &:disabled{
    background-color: grey !important;
  }
`
