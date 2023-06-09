import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoDBClient } from '@libs/dynamodb'
import { Product } from '@models/product';

const scan = async () => {
    const result = await dynamoDBClient.send(new ScanCommand({
        TableName: process.env.PRODUCTS_TABLE
    }))

    return result
}

export const getAllProducts = async (): Promise<Product[]> => {
    const { Items } = await scan()

    return Items as Product[]
}
