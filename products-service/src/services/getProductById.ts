import { QueryCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoDBClient } from '@libs/dynamodb'

import { Product } from '@models/product'

export const getProduct = async (productId: string): Promise<Product> => {
    const { Items } = await dynamoDBClient.send(new QueryCommand({
        TableName: process.env.PRODUCTS_TABLE,
        ExpressionAttributeValues: {
            ':id': productId
        },
        KeyConditionExpression: 'id = :id',
    }))

    return Items?.[0] as Product
}

// GET - https://xgajzulxpg.execute-api.us-east-1.amazonaws.com/dev/products/available
// GET - https://xgajzulxpg.execute-api.us-east-1.amazonaws.com/dev/products/{id}
// GET - https://xgajzulxpg.execute-api.us-east-1.amazonaws.com/dev/products
// GET - https://xgajzulxpg.execute-api.us-east-1.amazonaws.com/dev/stocks/{id}
// GET - https://j65u7du1g6.execute-api.us-east-1.amazonaws.com/swagger
// GET - https://j65u7du1g6.execute-api.us-east-1.amazonaws.com/swagger.json
