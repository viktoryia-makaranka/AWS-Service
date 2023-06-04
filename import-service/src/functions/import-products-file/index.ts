import { handlerPath } from '../../libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: {
          origin: '*',
          headers: [ 'Authorization', 'Content-Type' ],
          allowCredentials: true
        },
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        authorizer: {
          arn: 'arn:aws:lambda:us-east-1:308936485245:function:authorization-service-dev-basicAuthorizer',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization'
        }
      }
    }
  ]
}
