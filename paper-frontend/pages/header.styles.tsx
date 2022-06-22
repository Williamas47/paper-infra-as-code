import styled from 'styled-components';
import { Button as MuiButton, IconButton } from "@material-ui/core";


export const HeaderElement = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #000c66;
  padding: 10px;
  position: relative;
`;

export const LeftSideButtons = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
`;

export const UserProfileButton = styled(IconButton)`
  background-color: #E9EAEC !important;
  border-radius: 5px !important;
  padding: 5px 10px;
  font-size: 0.875rem !important;
  transition: all 0.5s ease !important;
  & > span {
    gap: 10px;
    & > img {
      border-radius: 50%;
    }
  }
  &:hover {
    background-color: #fad02c !important;
    color: black !important;
  }
`;

export const Button = styled(MuiButton)`
  height: 100%;
  color: #e9eaec !important;
  &:hover {
    background-color: #fad02c !important;
    color: black !important;
  }
`;



