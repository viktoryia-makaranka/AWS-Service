import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { middyfy } from '@libs/lambda'
import { getAllProducts } from '@services/getProducts'
import { getAllStocks } from '@services/getStocks'

const _getProductsList = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('[START] ', JSON.stringify(event))

  try {
    const products = await getAllProducts()
    const stocks = await getAllStocks()

    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products.map((product) => {
        const { product_id, ...stockData } = stocks.find(({ product_id }) => product_id === product.id) || {}

        return {
        ...product,
        ...stockData
        }
      }))
    }

    console.log('[SUCCESS]: ', response.body)

    return response
  } catch (error) {
    console.error('[FAIL]: ', error.errorMessage || error.message)

    throw new Error(error)
  }
}

export const getProductsList = middyfy(_getProductsList)
