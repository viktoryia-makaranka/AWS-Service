import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '@libs/lambda'
import { ValidatedEventAPIGatewayProxyEvent, handleError } from '@libs/api-gateway'
import { getStock } from '@services/getStockById'

const _getStock: ValidatedEventAPIGatewayProxyEvent<APIGatewayProxyEvent> = async (event) => {
  console.log('[START] ', JSON.stringify(event))

  const { id } = event.pathParameters

  if (!id) {
    handleError('[BadRequest] Missing required request parameters: [id]')
  }

  try {
    const stock = await getStock(id)

    if (!stock) {
      handleError('[NotFound] Product NOT found')
    }

    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stock)
    }

    console.log('[SUCCESS]: ', response.body)

    return response
  } catch (error) {
    console.error('[FAIL]: ', error.message || error.errorMessage)

    throw new Error(error)
  }
}

export const getStockById = middyfy(_getStock)
