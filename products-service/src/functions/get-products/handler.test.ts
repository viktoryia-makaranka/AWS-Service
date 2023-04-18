import { getProducts } from './handler'
import * as productService from '@services/getProducts'
import { products } from '../../mock/products'
import { event, context } from '../../mock/tests'


describe('getProducts', () => {
    it ('should throw product service error', () => {
        const errorMessage = 'Unknown error'

        jest.spyOn(productService, 'getAllProducts').mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        expect(getProducts(event, context)).rejects.toThrow(errorMessage)
    })

    it ('should return products', async () => {
        const productsResponse = await getProducts(event, context);

        expect(productsResponse).toEqual({ body: JSON.stringify(products), headers: event.headers, statusCode: 200 })
    })
})
