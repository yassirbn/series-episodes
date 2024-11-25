import { ApolloClient, ApolloLink, InMemoryCache, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API,
  headers: {
    'x-api-key': process.env.REACT_APP_GRAPHQL_API_KEY || '',
  },
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WEBSOCKET || '',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-api-key': process.env.REACT_APP_GRAPHQL_API_KEY || '',
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


