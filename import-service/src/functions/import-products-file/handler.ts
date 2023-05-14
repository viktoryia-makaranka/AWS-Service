import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway'
import { middyfy } from '../../libs/lambda'

import schema from './schema'

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { name } = event.queryStringParameters

  const client = new S3Client({})
  const command = new PutObjectCommand({
    Bucket: process.env.UPLOAD_BUCKET,
    Key: `${ process.env.UPLOAD_FOLDER }/${ name }`,
    ContentType: 'text/csv'
  })
  const url = await getSignedUrl(client, command, { expiresIn: 3600 })

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: url
  }

  return response
}

export const main = middyfy(importProductsFile).use(middyJsonBodyParser())
