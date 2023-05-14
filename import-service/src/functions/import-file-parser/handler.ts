import type { S3Event } from 'aws-lambda'
import { S3Client, ListObjectsV2Command, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import csv from 'csv-parser'
import { Readable } from 'stream'

import { middyfy } from '../../libs/lambda'

const importFileParser = async (event: S3Event) => {
  try {
    const client = new S3Client({})
    const command = new ListObjectsV2Command({
      Bucket: process.env.UPLOAD_BUCKET,
      Prefix: `${ process.env.UPLOAD_FOLDER }/`
    })

    let isTruncated = true
    const results = []

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await client.send(command)
      console.log('[CONTENTS]', Contents.map(({ Key }) => Key).join(', '))

      isTruncated = IsTruncated
      command.input.ContinuationToken = NextContinuationToken

      for (const { Key } of Contents.filter(({ Key }) => Key.split('/')[1])) {
        const command = new GetObjectCommand({
          Bucket: process.env.UPLOAD_BUCKET,
          Key
        })

        try {
          console.log('[IMPORT START]', Key)
          const { Body } = await client.send(command)

          await (Body as Readable).pipe(csv({ separator: ';' }))
            .on('data', (data) => {
              console.log('[LINE IMPORT SUCCESS]', data)
            })

          const CopySource = `${ process.env.UPLOAD_BUCKET }/${ Key }`
          const newKey = Key.replace(process.env.UPLOAD_FOLDER, process.env.PARSED_FOLDER)

          await client.send(new CopyObjectCommand({
            Bucket: process.env.UPLOAD_BUCKET,
            CopySource,
            Key: newKey
          }))

          console.log('[FILE COPY SUCCESS]', `${ CopySource } copied to ${ newKey}`)

          await client.send(new DeleteObjectCommand({
            Bucket: process.env.UPLOAD_BUCKET,
            Key
          }))

          console.log('[FILE DELETE SUCCESS]', Key)
        } catch (err) {
          console.error('[IMPORT FAIL]: ', err);
        }
      }
    }

    return results
  } catch (error) {
    console.error('[FAIL READ BUCKET]: ', error.errorMessage)

    throw new Error(error)
  }
}

export const main = middyfy(importFileParser)
