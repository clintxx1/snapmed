/**Libraries */
import React from "react";
/**App Container */
import AppContainer from "./screens/app-container";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import {HASURA_GRAPHQL_URL, HASURA_SECRET} from "@env";

const App = () => {
  // const client = new ApolloClient({
  //   uri: `${HASURA_GRAPHQL_URL}`,
  //   headers: {
  //     'x-hasura-admin-secret': `${HASURA_SECRET}`,
  //   },
  //   cache: new InMemoryCache(),
  // });
  return (
    // <ApolloProvider client={client}>
      <AppContainer />
    // </ApolloProvider>
  );
};

export default App;
