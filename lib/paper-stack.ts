import { Stack, StackProps } from "aws-cdk-lib";
import { HttpMethods } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { UserPool } from "./constructs/cognito/userPool";
import { GetProfilesAndFilesContent } from "./constructs/lambdas/getProfilesAndFilesContent";
import { LambdaUrlfn } from "./constructs/lambdaUrl";
import { Layer } from "./constructs/layers/libsLayer";
import { UploadsBucket } from "./constructs/s3/bucket";

export class PaperStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const CognitoUserPool = new UserPool(this, "UserPool");
    const S3UploadsBucket = new UploadsBucket(this, "UploadsBucket", {
      FRONTEND_URL: this.node.tryGetContext("FRONTEND_URL"),
    });
    const libsLayer = new Layer(this, "LibsLayer");
    const getProfilesAndFilesContent = new GetProfilesAndFilesContent(
      this,
      "GetProfilesAndFilesContent",
      {
        layer: [libsLayer.layerVersion],
        uploadsBucketName: S3UploadsBucket.bucket.bucketName,
        s3BaseUrl: `https://${S3UploadsBucket.bucket.bucketName}.s3.eu-west-1.amazonaws.com`,
      }
    );
    const lambdaUrlFunction = new LambdaUrlfn(
      this,
      "GetAndCreateClinicsLambdaUrlFunction",
      {
        lambdaFn: getProfilesAndFilesContent.function,
        authType: "NONE",
        cors: {
          AllowMethods: [HttpMethods.GET, HttpMethods.POST],
          AllowOrigins: [this.node.tryGetContext("FRONTEND_URL")],
          AllowHeaders: ["*"],
        },
      }
    );

  }
}
