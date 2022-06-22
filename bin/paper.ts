#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PaperStack } from '../lib/paper-stack';

const app = new cdk.App();
new PaperStack(app, 'PaperStack', {
});