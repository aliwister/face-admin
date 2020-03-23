import React from 'react';
import badalsAPI, { errorHandler } from '../api/config';
type AuthProps = {
  isAuthenticated: boolean;
  authenticate: Function;
  signout: Function;
  token: String;
};

export const AuthContext = React.createContext({} as AuthProps);

const isValidToken = () => {
  //const token = localStorage.getItem('badals_token');
  // JWT decode & check token validity & expiration.

  // @ts-ignore
  if (inMemoryToken) return true;
  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(false);
  const [token, setToken] = React.useState("");

  function authenticate({ username, password }, cb) {
    badalsAPI.post(`/authenticate`, { "username": username, "password": password, "rememberMe":true })
        .then(res => {
          // @ts-ignore
          setToken(res.data.id_token);
          makeAuthenticated(true);
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            //console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            //console.log('Error', error.message);
          }
        });
        //makeAuthenticated(true);
        //localStorage.setItem('pickbazar_token', `${email}.${password}`);
        //setTimeout(cb, 100); // fake async
  }
  function signout(cb) {
    //makeAuthenticated(false);
    makeAuthenticated(false);
    setToken("");
    setTimeout(cb, 100);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
        token
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
