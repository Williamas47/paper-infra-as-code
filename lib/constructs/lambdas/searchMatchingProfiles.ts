import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Layer } from "../layers/libsLayer";

interface SearchMatchingProfileProps {
  // search: string;
  uploadsBucketName: string;
  layer: Array<Layer["layerVersion"]>;

}
export class SearchMatchingProfiles extends Construct {
    public readonly function: NodejsFunction
    constructor(scope: Construct, id: string, props: SearchMatchingProfileProps) {
        super(scope, id);

        this.function = new NodejsFunction(this, "dataSeedFunction", {
            entry: "./lambdas/searchMatchingProfiles/index.ts",
            functionName: "search-matching-profiles",
            layers: [...props.layer || []],
            runtime: Runtime.NODEJS_14_X,
            timeout: Duration.minutes(15),
            environment:{
                // search: props.search,
                UPLOADS_BUCKET: props.uploadsBucketName,

            }
        }
        );
    }
}
