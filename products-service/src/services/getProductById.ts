import { products } from '../mock/products'
import { Product } from '@models/product';

export const getProduct = async (productId: string): Promise<Product> => products.find(({ id }) => id === productId)
