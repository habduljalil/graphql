import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { isTokenValid, removeStoredToken } from "./auth/token";

const httpLink = new HttpLink({
  uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    removeStoredToken();
    return {
      headers: {
        ...headers,
        Authorization: "",
      },
    };
  }

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const hasAuthError =
    graphQLErrors?.some(({ message }) =>
      message?.includes("JWTExpired") || message?.includes("Could not verify JWT")
    ) ||
    networkError?.message?.includes("JWTExpired") ||
    networkError?.message?.includes("Could not verify JWT") ||
    networkError?.statusCode === 401;

  if (hasAuthError) {
    removeStoredToken();
    window.location.replace("/");
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
