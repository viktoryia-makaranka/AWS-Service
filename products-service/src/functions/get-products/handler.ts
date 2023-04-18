import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { middyfy } from '@libs/lambda'
import { getAllProducts } from '@services/getProducts'

const _getProducts = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('[START] ', JSON.stringify(event))

  try {
    const products = await getAllProducts()
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    }

    console.log('[SUCCESS]: ', response.body)

    return response
  } catch (error) {
    console.error('[FAIL]: ', error.errorMessage)

    throw new Error(error)
  }
}

export const getProducts = middyfy(_getProducts)
