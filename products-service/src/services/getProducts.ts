import { products } from '../mock/products'
import { Product } from '@models/product';

export const getAllProducts = async (): Promise<Product[]> => products
