interface baseObjectType {
    id: string,
    name: string
}

export interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
    imageUrl: string,
    category: baseObjectType,
    type: baseObjectType,
    collection: baseObjectType,
    group: baseObjectType
}

export interface ProductWithStock extends Product {
    count: number
}