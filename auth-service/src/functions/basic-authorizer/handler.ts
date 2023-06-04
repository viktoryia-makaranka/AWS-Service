import type { APIGatewayTokenAuthorizerHandler } from 'aws-lambda'

const generatePolicy = (principalId: String, resource: String, effect: String = 'Deny') => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }
    ]
  }
})

const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async (event) => {
  console.log('[AUTH] ', JSON.stringify(event))

  if (event.type !== 'TOKEN' || !event.authorizationToken) {
    return {
      statusCode: 401,
      body: 'Authorization header is not provided'
    }
  }

  try {
    const base64Token = event.authorizationToken.split(' ')[1]
    const [ username, password ] = Buffer.from(base64Token, 'base64').toString('utf8').split(':')
    const effect = password && process.env[username] === password ? 'Allow' : 'Deny'
    console.log('[AUTH EFFECT] ', effect)

    return generatePolicy(base64Token, event.methodArn, effect);
  } catch (error) {
    console.log('[AUTH ERROR] ', error.message)

    return error
  }
}

export const main = basicAuthorizer
