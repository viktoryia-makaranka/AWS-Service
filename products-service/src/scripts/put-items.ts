import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoDBClient } from '@libs/dynamodb'
import { products } from '../mock/products'
import { v4 as uuidv4 } from 'uuid'

const productsWithIds = products.map((item) => ({
    ...item,
    id: uuidv4()
}))

const params = {
    RequestItems: {
        products: productsWithIds.map((item) => ({
            PutRequest: {
                Item: item
            }
        })),
        stocks: productsWithIds.map(({ id }) => ({
            PutRequest: {
                Item: {
                    product_id: id,
                    count: Math.floor(Math.random() * 100) + 1
                }
            }
        })),
    }
}

try {
    dynamoDBClient.send(new BatchWriteCommand(params))
} catch (error) {
    console.error(error)
}
