import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoDBClient } from '@libs/dynamodb'

import { Stock } from '@models/stock'

export const getStock = async (productId: string): Promise<Stock> => {
    const { Items } = await dynamoDBClient.send(new QueryCommand({
        TableName: process.env.STOCKS_TABLE,
        ExpressionAttributeValues: {
            ':id': productId
        },
        KeyConditionExpression: 'product_id = :id',
    }))

    return Items?.[0] as Stock
}
