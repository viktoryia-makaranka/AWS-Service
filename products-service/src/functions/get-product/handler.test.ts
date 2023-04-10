import { getProductById } from './handler'
import * as productService from '@services/getProductById'
import { products } from '../../mock/products'
import { event, context } from '../../mock/tests'

describe('getProductById', () => {
    it ('should throw 400 error when no id provided', () => {
        expect(getProductById(event, context)).rejects.toThrow('[BadRequest] Missing required request parameters: [id]')
    })

    it ('should throw product service error', () => {
        const errorMessage = 'Unknown error'

        jest.spyOn(productService, 'getProduct').mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        expect(getProductById({
            ...event,
            pathParameters: {
                id: '5'
            }
        }, context)).rejects.toThrow(errorMessage)
    })

    it ('should throw 404 error when incorrect id provided',  () => {
        expect(getProductById({
            ...event,
            pathParameters: {
                id: '9999'
            }
        }, context)).rejects.toThrow('[NotFound] Product NOT found')
    })

    it ('should return product', async () => {
        const productId = '5'
        const product = products.find(({ id }) => id === productId)

        const productResponse = await getProductById({
            ...event,
            pathParameters: {
                id: productId
            }
        }, context);

        expect(productResponse).toEqual({ body: JSON.stringify(product), headers: event.headers, statusCode: 200 })
    })
})
