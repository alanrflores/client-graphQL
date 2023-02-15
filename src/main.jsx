import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//punto de entrada para que se conecte
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
// import { SchemaLink } from '@apollo/client/link/schema';
import { setContext } from "apollo-link-context";
import CartContextProvider from "./context/CartContextProvider";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: "http://localhost:3000/graphql" })),
  cache: new InMemoryCache(),
  // link: new HttpLink({
  //   uri: 'http://localhost:3000/graphql'
  // }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
