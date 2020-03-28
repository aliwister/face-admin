import React from 'react';
import badalsAPI, { errorHandler } from '../api/config';
import Cookies from 'js-cookie';
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
    const token = Cookies.get('token');
    console.log('Auth.isValidToken:',token);
    if(token) {
        console.log('Auth.isValidToken: returning true');
        return true;
    }
    console.log('Auth.isValidToken: returning false');
    return false;
  // @ts-ignore
  if (inMemoryToken) return true;
  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());
  const [token, setToken] = React.useState("");

  async function authenticate({username, password}, cb) {
      return badalsAPI.post(`/authenticate`, {"username": username, "password": password, "rememberMe": true})
          .then(res => {
              // @ts-ignore
              console.log(res.data.id_token);
              setToken(res.data.id_token);
              Cookies.set('token', res.data.id_token, {expires: 1})
              makeAuthenticated(true);
          });
  }
  function signout(cb) {
    //makeAuthenticated(false);
      Cookies.remove('token', { path: '' });
    //setting
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
