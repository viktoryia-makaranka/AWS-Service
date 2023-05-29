import type { AWS } from '@serverless/typescript'

import getProductById from './src/functions/get-product'
import getProducts from './src/functions/get-products'
import getProductsList from './src/functions/get-products-list'
import getStockById from './src/functions/get-stock'
import createProduct from './src/functions/create-product'
import catalogBatchProcess from './src/functions/catalog-batch-process'

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [ 'serverless-esbuild', 'serverless-offline', 'serverless-auto-swagger' ],
  provider: {
    name: 'aws',
    profile: 'sandx',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'dynamodb:*',
        Resource: [
            `arn:aws:dynamodb:us-east-1:308936485245:table/*`
        ]
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: {
          'Fn::GetAtt': [ 'CatalogItemsQueue', 'Arn' ]
        }
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          Ref: 'createProductTopic'
        }
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: 'products',
      STOCKS_TABLE: 'stocks',
      SNS: {
        Ref: 'createProductTopic'
      }
    },
  },
  resources: {
    Resources: {
      CatalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'product-service-queue'
        }
      },
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'create-product-topic'
        },
      },
      createProductSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'viktoryia_makaranka@epam.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'createProductTopic'
          }
        }
      },
      createMoreThanFiftyProductSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'mvikaf@mail.ru',
          Protocol: 'email',
          FilterPolicy: {
            count: [{ numeric: ['>=', 50]}]
          },
          TopicArn: {
            Ref: 'createProductTopic'
          }
        }
      }
    },
  },
  functions: {
    getProducts,
    getProductById,
    getProductsList,
    getStockById,
    createProduct,
    catalogBatchProcess
  },
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
      concurrency: 10
    },
  },
}

module.exports = serverlessConfiguration
