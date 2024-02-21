import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Pages from "./routes";
import "./assets/styles/global-style.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Pages />
    </ApolloProvider>
  </BrowserRouter>
);
