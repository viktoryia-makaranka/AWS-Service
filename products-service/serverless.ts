import type { AWS } from '@serverless/typescript'

import getProductById from './src/functions/get-product'
import getProducts from './src/functions/get-products'
import getProductsList from './src/functions/get-products-list'
import getStockById from './src/functions/get-stock'
import createProduct from './src/functions/create-product'

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
    iam: {
      role: 'arn:aws:iam::308936485245:role/DynamoDBLambdaAccessRole'
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: 'products',
      STOCKS_TABLE: 'stocks'
    },
  },
  functions: { getProducts, getProductById, getProductsList, getStockById, createProduct },
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
