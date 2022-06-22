import { Button, IconButton } from "@material-ui/core";
import styled from "styled-components";

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 20vh;
  margin: 0 auto;
  width: 80%;
  position: relative;
`;
export const ProfileInfoSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const ProfileInfoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 75px;
  & > p {
    width: 75px;
  }
`;

export const ProfileImageButton = styled(IconButton)`
  border-radius: 5px !important;

  & > span > img {
    border-radius: 5px;
    height: 50px;
    width: 50px;
    object-fit: cover;
  }
`;
export const ProfileImageCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 75px;
`;

export const UploadImageButton = styled(Button)`
  padding: 10px 15px !important;
  background-color: #0000ff !important;
  color: #e9eaec !important;
  transition: 0.5s ease !important;
  &:hover {
    background-color: #fad02c !important;
    color: black !important;
  }
`;

export const ImagesContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 25px 0;
  display: flex;
  flex-direction: row;
  gap: 25px 2%;
  max-width: 80%;
  flex-wrap: wrap;
  & > img {
    width: 32%;
    height: 350px;
    object-fit: cover;
  }
`;


export const NoUploadsContainer = styled.div`
  width: 80%;
  height: 350px;
  margin: 0 auto;
  padding: 25px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;