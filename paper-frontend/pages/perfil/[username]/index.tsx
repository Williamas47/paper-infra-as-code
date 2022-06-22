import React from "react";
import * as AWS from "aws-sdk";
import { useRouter } from "next/router";
import {
  TopSection,
  ProfileInfoSection,
  ProfileInfoText,
  ProfileImageButton,
  ProfileImageCount,
  UploadImageButton,
  ImagesContainer,
  NoUploadsContainer,
} from "./index.styles";
import { Image } from "@material-ui/icons";
import FileUpload from "../../FileUpload";
import { Typography } from "@material-ui/core";

const ProfileId = (): JSX.Element => {
  const router = useRouter();
  const { username } = router.query;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isPorfilePic, setIsPorfilePic] = React.useState<boolean>(false);
  const [userFeedPictures, setUserFeedPictures] = React.useState<string[]>([]);
  const [userProfilePic, setUserProfilePic] = React.useState<string>();
  const s3BaseUrl = process.env.S3_BASE_URL;
  const bucketName = process.env.UPLOADS_BUCKET as string;
  const placeholderProfilePic =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const s3 = new AWS.S3({
    params: { Bucket: bucketName },
    signatureVersion: "v4",
  });

  const getAllUserImages = (username: string) => {
    if (!username) {
      return;
    }
    const params = {
      Bucket: bucketName,
      Delimiter: "/",
      Prefix: `${username}/`,
    };

    s3.listObjects(
      params,
      (err: AWS.AWSError, data: AWS.S3.Types.ListObjectsOutput) => {
        if (err) {
          throw new Error(
            "There was an error viewing your album: " + err.message
          );
        } else {
          if (!data.Contents) {
            throw new Error("No images found for this user");
          }
          const feed: string[] = [];
          data.Contents.forEach(function (obj, index) {
            const isProfilePic = obj.Key === `${username}/profile`;
            if (isProfilePic) {
              setUserProfilePic(`${s3BaseUrl}/${obj.Key}`);
            } else {
              feed.push(`${s3BaseUrl}/${obj.Key}`);
            }
          });
          setUserFeedPictures(feed);
        }
      }
    );
  };
  React.useEffect(() => {
    getAllUserImages(username as string);
  }, [username]); //eslint-disable-line

  return (
    <div>
      {isOpen && (
        <FileUpload
          setIsOpen={setIsOpen}
          currentUser={username as string}
          isPorfilePic={isPorfilePic}
        />
      )}
      <TopSection>
        <ProfileInfoSection>
          <ProfileImageButton
            onClick={() => {
              setIsOpen(true);
              setIsPorfilePic(true);
            }}
          >
            <img src={userProfilePic || placeholderProfilePic} alt="" />
          </ProfileImageButton>
          <ProfileInfoText>
            <p>@{username}</p>
            <ProfileImageCount>
              <Image />
              <p>{userFeedPictures?.length || 0}</p>
            </ProfileImageCount>
          </ProfileInfoText>
        </ProfileInfoSection>
        <UploadImageButton
          onClick={() => {
            setIsOpen(true);
            setIsPorfilePic(false);
          }}
        >
          Envie fotos
        </UploadImageButton>
      </TopSection>
      {userFeedPictures?.length > 0 ? (
        <ImagesContainer>
          {userFeedPictures.map((file, idx) => (
            <img key={idx} src={file} alt="" />
          ))}
        </ImagesContainer>
      ) : (
        <NoUploadsContainer>
          <Typography variant="h5">Nenhuma imagem enviada por aqui</Typography>
        </NoUploadsContainer>
      )}
    </div>
  );
};

export default ProfileId;
