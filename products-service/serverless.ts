import type { AWS } from '@serverless/typescript'

import getProductById from './src/functions/get-product'
import getProducts from './src/functions/get-products'

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
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: { getProducts, getProductById },
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
