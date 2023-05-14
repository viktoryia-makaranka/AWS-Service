export default {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number', minimum: 0 },
                count: { type: 'integer', minimum: 0 }
            },
            required: ['title', 'description', 'price', 'count']
        }
    }
} as const