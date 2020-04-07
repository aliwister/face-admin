import React from 'react';
import badalsAPI, { errorHandler } from '../api/config';
import Cookies from 'js-cookie';
type AuthProps = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMerchant: boolean;
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
const isValidAdmin = () => {
    const token = Cookies.get('authorities');
    if(token && token.indexOf("ROLE_ADMIN") > -1) {
        return true;
    }
    return false;
  // @ts-ignore
  if (inMemoryToken) return true;
  return false;
};
const isValidMerchant = () => {
    const token = Cookies.get('authorities');
    if(token && token.indexOf("ROLE_MERCHANT") > -1) {
        return true;
    }
    return false;
  // @ts-ignore
  if (inMemoryToken) return true;
  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());
  const [isAdmin, makeAdmin] = React.useState(isValidAdmin());
  const [isMerchant, makeMerchant] = React.useState(isValidMerchant());
  const [token, setToken] = React.useState("");

  async function authenticate({username, password}, cb) {
      return badalsAPI.post(`/authenticate`, {"username": username, "password": password, "rememberMe": true})
          .then(res => {
              // @ts-ignore
              console.log(res);
              console.log(res.data);
              console.log(res.data.id_token);
              setToken(res.data.id_token);
              Cookies.set('token', res.data.id_token, {expires: 1});
              Cookies.set('authorities', res.data.authorities, {expires: 1});
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
        isAdmin,
        isMerchant,
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
