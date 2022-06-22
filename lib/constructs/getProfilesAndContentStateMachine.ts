import { Duration } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {
  Wait,
  WaitTime,
  StateMachine as sfnStateMachine,
} from "aws-cdk-lib/aws-stepfunctions";
import { LambdaInvoke } from "aws-cdk-lib/aws-stepfunctions-tasks";
import { Construct } from "constructs";

interface StateMachineProps {
  searchMatchingProfiles: NodejsFunction;
  getMatchingProfilesContent: NodejsFunction;
}

export class GetProfilesAndContentStateMachine extends Construct {
  public readonly stateMachine: sfnStateMachine;
  constructor(scope: Construct, id: string, props: StateMachineProps) {
    super(scope, id);

    const definition = new LambdaInvoke(this, "Get Config", {
      lambdaFunction: props.searchMatchingProfiles,
      inputPath: "$.Payload",
      outputPath: "$.Payload",
    }).next(
      new LambdaInvoke(this, "Generate the data", {
        lambdaFunction: props.getMatchingProfilesContent,
        inputPath: "$.body",
        outputPath: "$.Payload",
      })
    );

    this.stateMachine = new sfnStateMachine(this, "stateMachine", {
      definition,
      timeout: Duration.minutes(5),
      stateMachineName: "get-profiles-and-content",
    });
  }
}
