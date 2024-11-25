import { StrictMode } from "react";
import "./App.css";
import AppRouter from "./routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/graphqlClient";

function App() {
  return (
    <StrictMode>
      <ApolloProvider client={client}>
        <div className="App min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
          <AppRouter></AppRouter>
        </div>
      </ApolloProvider>
    </StrictMode>
  );
}

export default App;
