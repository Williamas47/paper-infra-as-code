import { RemovalPolicy } from "aws-cdk-lib";
import { AssetCode, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class Layer extends Construct {
  public readonly layerVersion: LayerVersion;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.layerVersion = new LayerVersion(this, "LambdasLayer", {
      code: new AssetCode("./lambdas/node_modules"),
      compatibleRuntimes: [Runtime.NODEJS_14_X],
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
