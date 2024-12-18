import { GraphQLClient } from 'graphql-request';
import { ApolloClient, ApolloLink, InMemoryCache, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const API_URL = process.env.REACT_APP_GRAPHQL_API!;
const API_KEY = process.env.REACT_APP_GRAPHQL_API_KEY!;
const WEB_SOCKET_URI = process.env.REACT_APP_GRAPHQL_WEBSOCKET!;

if (!API_URL || !API_KEY) {
  throw new Error('GraphQL API URL or API Key is missing in environment variables.');
}

if(!WEB_SOCKET_URI){
  throw new Error('WEB socket API URL is missing in environment variables.');
}

export const graphqlClient = new GraphQLClient(API_URL, {
  headers: {
    'x-api-key': API_KEY,
  },
});


const httpLink = new HttpLink({
  uri: API_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

const wsLink = new WebSocketLink({
  uri: WEB_SOCKET_URI,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-api-key': API_KEY,
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: ApolloLink.from([splitLink]),
  cache: new InMemoryCache(),
});


