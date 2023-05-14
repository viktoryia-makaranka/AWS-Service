import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getStockById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'stocks/{id}'
      }
    }
  ]
};
