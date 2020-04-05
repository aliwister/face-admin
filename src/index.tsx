/* eslint-disable import/first */
import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { theme } from './theme';
import Routes from './routes';
import ApolloClient from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import {createHttpLink, HttpLink} from 'apollo-link-http';
import * as serviceWorker from './serviceWorker';
import Cookies from 'js-cookie';
import './theme/global.css';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import {AuthContext} from "./context/auth";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};


const token = Cookies.get('token');


const shopLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL1,
  headers: {
    Authorization: `Bearer ${token}`
  },
});
const adminLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL2,
  headers: {
    Authorization: `Bearer ${token}`
  },

  // other link options...
});
//createHttpLink({ uri: process.env.REACT_APP_API_URL })
//const adminLink = createHttpLink({ uri: 'fuckyou' })
/*const authLink = setContext((_, { headers }) => {

  }
        [
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
        Cookies.remove('token', { path: '' });
      }
      if (networkError) {
        //logoutUser();
        console.log(graphQLErrors);
        Cookies.remove('token', { path: '' });
        //window.location.href='/';
      }
    }),
    auth
})*/
const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.split(
      operation => operation.getContext().clientName === "shopLink", // Routes the query to the proper client
      shopLink,
      adminLink
  ),
  cache: new InMemoryCache()
});

/*
const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL })
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token');
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }
})
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
        Cookies.remove('token', { path: '' });
      }
      if (networkError) {
        //logoutUser();
        console.log(graphQLErrors);
        Cookies.remove('token', { path: '' });
        //window.location.href='/';
      }
    }),
    authLink,
    httpLink]),

  cache: new InMemoryCache()
});
*/



const mtheme = createMuiTheme();

function App() {
  const engine = new Styletron();
  const { token } = useContext(AuthContext);
  console.log("Token:",token);

  return (
    <ApolloProvider client={client as any}>
      <StyletronProvider value={engine}>
        <ThemeProvider theme={mtheme}>
        <Provider template={AlertTemplate} {...options}>
        <BaseProvider theme={theme}>
          <BrowserRouter>

            <Routes />
          </BrowserRouter>
        </BaseProvider>
        </Provider>
        </ThemeProvider>
      </StyletronProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
