import { Construct } from "constructs";
import * as S3 from "aws-cdk-lib/aws-s3";

interface UploadsBucketProps {
  FRONTEND_URL: string;
}

export class UploadsBucket extends Construct {
  public readonly bucket: S3.Bucket;

  constructor(scope: Construct, id: string, props: UploadsBucketProps) {
    super(scope, id);

    this.bucket = new S3.Bucket(this, "uploadsBucket", {
      encryption: S3.BucketEncryption.S3_MANAGED,
      accessControl: S3.BucketAccessControl.PUBLIC_READ_WRITE,
      bucketName: "paper-infra-as-code-uploads-bucket",
      cors: [
        {
          allowedMethods: [
            S3.HttpMethods.POST,
            S3.HttpMethods.PUT,
            S3.HttpMethods.GET,
            S3.HttpMethods.DELETE,
          ],
          allowedOrigins: [props.FRONTEND_URL],
          allowedHeaders: ["*"],
        },
      ],
    });
  }
}
