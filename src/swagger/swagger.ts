import swaggerJSDoc from "swagger-jsdoc";
const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Server API',
            version: '1.0.0',
            description: 'A API for file server',
            contact: {
                name: 'Agbobli Isaac'
            },
        },
        servers: [
            {
                url: 'http://localhost:8000/api/v1/',
                description: 'Development server',
            }
        ],
    },
   
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(option);

export default swaggerSpec;
