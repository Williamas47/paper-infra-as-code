import { aws_cognito, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";

export class UserPool extends Construct {
  public userPool: aws_cognito.UserPool;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.userPool = new aws_cognito.UserPool(this, "userpool", {
      userPoolName: "PaperStackUserPool",
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
        },
        fullname: {
          mutable: true,
          required: true,
        },
      },
      customAttributes: {
        country: new aws_cognito.StringAttribute({ mutable: true }),
        city: new aws_cognito.StringAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: aws_cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.RETAIN,
    });
  }
}
