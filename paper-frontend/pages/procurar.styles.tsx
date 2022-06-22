import { IconButton, TextField } from '@material-ui/core';
import styled from 'styled-components';

export const SearchSection = styled.div`
  height: 20vh;
  padding: 20px 0;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const SearchTextField = styled(TextField)`
  width: 400px;
  // height: 25px; /;/;/;/;/;
`

export const SearchIconButton = styled(IconButton)`
  border-radius: 5px !important;
  // height: 80%; 🤔
  background-color: #0000FF !important;
  & > span > svg {
    fill: #E9EAEC
  }
`;


export const ResultsSection = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px 1%;
  margin: 0 auto;
  width: 90%;
`;
export const ResultItem = styled.div`
  width: 49%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #E9EAEC;
  border-radius: 5px;
  padding: 10px 20px;
  box-sizing: border-box;
  & > img {
    border-radius: 50%;
  }
`;
export const ResultLeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const ResultRightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: white;
  background-color: #000C66;
  border-radius: 5px;
  padding: 5px;
`;
