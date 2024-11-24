import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.REACT_APP_GRAPHQL_API!;
const API_KEY = process.env.REACT_APP_GRAPHQL_API_KEY!;

if (!API_URL || !API_KEY) {
  throw new Error('GraphQL API URL or API Key is missing in environment variables.');
}

export const graphqlClient = new GraphQLClient(API_URL, {
  headers: {
    'x-api-key': API_KEY,
  },
});