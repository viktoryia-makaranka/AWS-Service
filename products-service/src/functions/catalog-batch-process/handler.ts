import type { SQSEvent } from 'aws-lambda'
import middy from '@middy/core'
import { v4 as uuidv4 } from 'uuid'
import { PublishCommand, SNS } from '@aws-sdk/client-sns'

import { handleError } from '@libs/api-gateway'
import { createProductWithStock } from '@services/createProduct'

const _catalogBatchProcess = async (event: SQSEvent) => {
  console.log('[START] ', JSON.stringify(event))

  const products = event.Records.map(({ body }) => body && JSON.parse(body)).filter((product) => product)

  if (!products?.length) {
    handleError('[BadRequest] No products to create')
  }

  try {
    for (const product of products) {
      try {
        const id = uuidv4()
        console.log('[PRODUCT CREATE START]', product)
        const response = await createProductWithStock({
          id,
          ...product,
          count: Number(product.count)
        })

        console.log('[PRODUCT CREATE SUCCESS]', response)

        const sns = new SNS({})
        const snsPublishCommand = new PublishCommand({
          Subject: 'PRODUCT CREATION',
          Message: JSON.stringify({ id, ...product }),
          TopicArn: process.env.SNS,
          MessageAttributes: product
        })
        await sns.send(snsPublishCommand)

      } catch (err) {
        console.error('[PRODUCT CREATE FAIL]: ', err);
      }
    }
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' }
    }

    console.log('[PRODUCTS CREATE SUCCESS]: ', products)

    return response
  } catch (error) {
    console.error('[FAIL]: ', error.message || error.errorMessage)

    throw new Error(error)
  }
}

export const catalogBatchProcess = middy(_catalogBatchProcess)
