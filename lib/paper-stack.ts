import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { UserPool } from "./constructs/cognito/userPool";
import { GetProfilesAndContentStateMachine } from "./constructs/getProfilesAndContentStateMachine";
import { GetMatchingProfilesContent } from "./constructs/lambdas/getMatchingProfilesContent";
import { SearchMatchingProfiles } from "./constructs/lambdas/searchMatchingProfiles";
import { Layer } from "./constructs/layers/libsLayer";
import { UploadsBucket } from "./constructs/s3/bucket";

export class PaperStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const CognitoUserPool = new UserPool(this, "UserPool");
    const S3UploadsBucket = new UploadsBucket(this, "UploadsBucket", {
      FRONTEND_URL: this.node.tryGetContext("FRONTEND_URL"),
    });
    const libsLayer = new Layer(this, 'LibsLayer');

    const searchMatchingProfiles = new SearchMatchingProfiles(this, 'SearchMatchingProfiles', {
      layer: [libsLayer.layerVersion],
      uploadsBucketName: S3UploadsBucket.bucket.bucketName
    });

    const getMatchingProfilesContent = new GetMatchingProfilesContent(this, 'GetMatchingProfilesContent', {
      layer: [libsLayer.layerVersion],
      uploadsBucketName: S3UploadsBucket.bucket.bucketName,
      s3BaseUrl: `https://${S3UploadsBucket.bucket.bucketName}.s3.eu-west-1.amazonaws.com`
    });

    const getProfilesAndContent = new GetProfilesAndContentStateMachine(this, 'GetProfilesAndContentStateMachine', {
      searchMatchingProfiles: searchMatchingProfiles.function,
      getMatchingProfilesContent: getMatchingProfilesContent.function,
    });
  }
}
