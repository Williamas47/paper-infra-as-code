import * as lambda from "aws-cdk-lib/aws-lambda";
import { CfnResource } from "aws-cdk-lib";
import { Construct } from "constructs";

export enum AuthType {
  NONE = "NONE",
  AWS_IAM = "AWS_IAM",
}
export interface LambdaUrlfnProps {
  lambdaFn: lambda.Function;
  authType?: string;
  cors?: {
    AllowMethods: Array<string>;
    AllowOrigins: Array<string>;
    AllowHeaders: Array<string>;
  };
}

export class LambdaUrlfn extends Construct {
  public lambdaUrl: CfnResource;
  public lambdaUrlPermission: CfnResource;
  constructor(scope: Construct, id: string, props: LambdaUrlfnProps) {
    super(scope, id);

    this.lambdaUrl = new CfnResource(this, "lambdaUrl", {
      type: "AWS::Lambda::Url",
      properties: {
        TargetFunctionArn: props.lambdaFn.functionArn,
        AuthType: props.authType ?? AuthType.NONE,
        Cors: props.cors || undefined,
      },
    });
    this.lambdaUrlPermission = new CfnResource(this, "lambdaUrlPermission", {
      type: "AWS::Lambda::Permission",
      properties: {
        FunctionName: props.lambdaFn.functionName,
        Principal: "*",
        Action: "lambda:InvokeFunctionUrl",
        FunctionUrlAuthType: "NONE",
      },
    });
  }
}
