import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import { middyfy } from '@libs/lambda'
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { createProductWithStock } from '@services/createProduct'
import { v4 as uuidv4 } from 'uuid'
import Schema from './schema'

const _createProductWithStock: ValidatedEventAPIGatewayProxyEvent<typeof Schema> = async (event, {} ) => {
  console.log('[START] ', JSON.stringify(event))

  const id = uuidv4()

  const product = { id, ...event.body }

  try {
    await createProductWithStock(product)

    const response = {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }

    console.log('[SUCCESS]: ', response.body)

    return response
  } catch (error) {
    console.error('[FAIL]: ', error.message || error.errorMessage)

    throw new Error(error)
  }
}

export const createProduct = middyfy(_createProductWithStock)
    .use(
      validator({
        eventSchema: transpileSchema(Schema)
      })
    )
