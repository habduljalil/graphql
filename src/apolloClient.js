import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const token = localStorage.getItem("token"); 

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
    headers: {
      Authorization: token ? `Bearer ${token}` : "", 
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
