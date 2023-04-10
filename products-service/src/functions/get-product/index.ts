import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        request: {
          schemas: {
            'application/json': schema,
          },
          parameters: {
            paths: {
              id: true
            }
          }
        }
      }
    }
  ]
};
