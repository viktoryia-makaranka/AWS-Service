import type { AWS } from '@serverless/typescript'

import importProductsFile from './src/functions/import-products-file'
import importFileParser from './src/functions/import-file-parser'

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    profile: 'sandx',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: [
          'arn:aws:s3:::${self:provider.environment.UPLOAD_BUCKET}'
        ]
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: [
          'arn:aws:s3:::${self:provider.environment.UPLOAD_BUCKET}/*'
        ]
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: [
          'arn:aws:sqs:us-east-1:308936485245:product-service-queue'
        ]
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      UPLOAD_FOLDER: 'uploaded',
      PARSED_FOLDER: 'parsed',
      UPLOAD_BUCKET: 'import-service-s3-bucket',
      SQS: 'https://sqs.us-east-1.amazonaws.com/308936485245/product-service-queue'
    },
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
