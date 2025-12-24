import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.168.137.227:4000/graphql', // your backend
  }),
  cache: new InMemoryCache(),
});

export default client;
