import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoDBClient } from '@libs/dynamodb'

export const createProductWithStock = async (data) => {
    const { count, ...product } = data

    const response = await dynamoDBClient.send(new TransactWriteCommand({
        TransactItems: [{
            Put: {
                TableName: process.env.PRODUCTS_TABLE,
                Item: product,
                ConditionExpression: 'attribute_not_exists(PK)'
            }
        }, {
            Put: {
                TableName: process.env.STOCKS_TABLE,
                Item: {
                    product_id: product.id,
                    count
                },
                ConditionExpression: 'attribute_not_exists(PK)'
            }
        }]
    }))

    return response
}
