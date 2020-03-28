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
import { createHttpLink } from 'apollo-link-http';
import * as serviceWorker from './serviceWorker';
import Cookies from 'js-cookie';
import './theme/global.css';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

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
import { createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import {AuthContext} from "./context/auth";
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
