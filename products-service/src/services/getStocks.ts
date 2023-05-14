import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { dynamoDBClient } from '@libs/dynamodb'
import { Stock } from '@models/stock';

const scan = async () => {
    const result = await dynamoDBClient.send(new ScanCommand({
        TableName: process.env.STOCKS_TABLE
    }))

    return result
}

export const getAllStocks = async (): Promise<Stock[]> => {
    const { Items } = await scan()

    return Items as Stock[]
}
