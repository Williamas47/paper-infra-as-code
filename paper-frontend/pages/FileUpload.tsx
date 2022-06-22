import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import * as AWS from "aws-sdk";
import axios from "axios";
import { IconButton, Typography } from "@material-ui/core";
import { ModalContainer, ConfirmButton } from "./FileUpload.styles";
import { Close } from "@material-ui/icons";
import LoadingScreen from "./LoadingScreen";
interface FileUploadProps {
  setIsOpen: (arg0: boolean) => void;
  currentUser: string;
  isPorfilePic: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setIsOpen,
  currentUser,
  isPorfilePic,
}): JSX.Element => {
  const uploadedFiles = React.useRef<File[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const rekognition = new AWS.Rekognition({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
  const bucketName = process.env.UPLOADS_BUCKET as string;

  const s3 = new AWS.S3({
    params: { Bucket: bucketName },
    signatureVersion: "v4",
  });

  const handleFileUpload = () => {
    const files: File[] = uploadedFiles?.current;
    if (!files.length) return;
    setIsLoading(true);
    files.map(async (file: File) => {
      const fileArrayBuffer = await file.arrayBuffer().then((buff) => {
        return new Uint8Array(buff);
      });

      const Key = isPorfilePic
        ? `${currentUser}/profile`
        : `${currentUser}/${file.name}`;
      const type = file.type;

      rekognition.detectModerationLabels(
        {
          Image: {
            Bytes: fileArrayBuffer,
          },
          MinConfidence: 70,
        },
        async (
          err: AWS.AWSError,
          data: AWS.Rekognition.Types.DetectModerationLabelsResponse
        ) => {
          if (err) {
            console.log(err);
          } else {
            if (!data || !data.ModerationLabels) {
              return;
            }
            if (data.ModerationLabels.length > 0) {
              console.log("innapropriated image");
              handleClose();
              // toastr
              return;
            } else {
              const signedRequest = s3.getSignedUrl("putObject", {
                Bucket: bucketName,
                Key,
                ContentType: type,
                Expires: 7200,
                ACL: "public-read",
              });

              await axios(signedRequest, {
                method: "PUT",
                data: file,
                headers: {
                  "Content-Type": type,
                  "x-amz-acl": "public-read",
                },
              });
              handleClose();
            }
          }
        }
      );
    });
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <ModalContainer open={true} onClose={handleClose}>
        <IconButton>
          <Close onClick={handleClose} />
        </IconButton>
        <Typography variant="h4">
          <strong>
            {isPorfilePic ? "Enviar foto de perfil" : "Enviar fotos"}
          </strong>
        </Typography>
        <DropzoneArea
          maxFileSize={5000000}
          filesLimit={isPorfilePic ? 1 : 10}
          dropzoneText={"Arraste um arquivo até aqui ou clique"}
          onChange={(files) => (uploadedFiles.current = files)}
        />
        <ConfirmButton
          // disabled={uploadedFiles?.current?.length < 0}
          onClick={handleFileUpload}
        >
          Confirmar
        </ConfirmButton>
      </ModalContainer>
    </>
  );
};

export default FileUpload;
