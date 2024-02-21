import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

// Initialize Apollo Client with an initial access token
const initialAccessToken = sessionStorage.getItem("access_token") || "";

const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });

const createApolloClient = (accessToken: string) => {
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

  return client;
};

export let apolloClient = createApolloClient(initialAccessToken);

export const updateAccessToken = (newAccessToken: string) => {
  apolloClient.setLink(
    ApolloLink.from([
      new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            authorization: newAccessToken ? `Bearer ${newAccessToken}` : "",
          },
        });
        return forward(operation);
      }),
      httpLink,
    ])
  );
};
