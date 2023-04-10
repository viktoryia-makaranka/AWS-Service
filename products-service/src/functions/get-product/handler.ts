import { middyfy } from '@libs/lambda'
import { ValidatedEventAPIGatewayProxyEvent, handleError } from '@libs/api-gateway'
import { getProduct } from '@services/getProductById'
import schema from './schema'

const _getProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('[START] ', JSON.stringify(event))

  const { id } = event.pathParameters

  if (!id) {
    handleError('[BadRequest] Missing required request parameters: [id]')
  }

  try {
    const product = await getProduct(id)

    if (!product) {
      handleError('[NotFound] Product NOT found')
    }

    const response = {
      statusCode: 200,
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

export const getProductById = middyfy(_getProduct)
