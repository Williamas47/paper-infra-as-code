import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Layer } from "../layers/libsLayer";

interface GetMatchingProfilesContentProps {
  uploadsBucketName: string;
  s3BaseUrl: string;
  layer: Array<Layer["layerVersion"]>;
}

export class GetMatchingProfilesContent extends Construct {
  public readonly function: NodejsFunction;
  constructor(
    scope: Construct,
    id: string,
    props: GetMatchingProfilesContentProps
  ) {
    super(scope, id);

    this.function = new NodejsFunction(this, "dataSeedFunction", {
      entry: "./lambdas/getMatchingProfilesContent/index.ts",
      functionName: "get-matching-profiles-content",
      layers: [...(props.layer || [])],
      runtime: Runtime.NODEJS_14_X,
      timeout: Duration.minutes(15),
      environment: {
        UPLOADS_BUCKET: props.uploadsBucketName,
        S3_BASE_URL: props.s3BaseUrl,
      },
    });
  }
}
