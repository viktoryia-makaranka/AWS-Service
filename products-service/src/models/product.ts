import { currencies } from '../mock/currencies'

interface baseObjectType {
    id: string,
    name: string
}

type Currency = keyof (typeof currencies)

type Price = {
    [currency in Currency]: number
}

export interface Product {
    id: string,
    title: string,
    description: string,
    price: Price,
    imageUrl: string,
    category: baseObjectType,
    type: baseObjectType,
    collection: baseObjectType,
    group: baseObjectType
}