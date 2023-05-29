import { handlerPath } from '../../libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: '${self:provider.environment.UPLOAD_BUCKET}',
        event: 's3:ObjectCreated:*',
        rules: [{
          prefix: '${self:provider.environment.UPLOAD_FOLDER}/'
        }],
        existing: true
      }
    }
  ]
}
