import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/auth';
import {
  FormFields,
  FormLabel,
  FormTitle,
  Error,
} from '../../components/FormFields/FormFields';
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from './Login.style';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Logoimage from '../../image/logo.svg';
import { useAlert } from "react-alert";
const initialValues = {
  username: '',
  password: '',
};

const getLoginValidationSchema = () => {
  return Yup.object().shape({
    username: Yup.string().required('Username is Required!'),
    password: Yup.string().required('Password is Required!'),
  });
};

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

export default () => {
  let history = useHistory();
  let location = useLocation();
  const { authenticate, isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />;
    const alert = useAlert();
  let { from } = (location.state as any) || { from: { pathname: '/' } };
  let login = async ({username, password}) => {
      let x = await authenticate({username, password}, () => {
          history.replace(from);
      }).catch(function (error) {
          if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              alert.error(error.response.data.title + ' ' + error.response.data.detail);
              //console.log(error.response.status);
              //console.log(error.response.headers);

              return error.response.data.detail;
          } else if (error.request) {
              // The request was made but no response was received
              //console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              //console.log('Error', error.message);
          }
      });;

  };
  return (
    <Wrapper>
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={login}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <FormFields>
                <LogoWrapper>
                  <LogoImage src={Logoimage} alt="badals-admin" />
                </LogoWrapper>
                <FormTitle>Log in to admin</FormTitle>
              </FormFields>

              <FormFields>
                <FormLabel>Username</FormLabel>
                <Field
                  type="email"
                  name="username"
                  component={MyInput}
                  placeholder="Ex: demo@demo.com"
                />
                {errors.username && touched.username && (
                  <Error>{errors.username}</Error>
                )}
              </FormFields>
              <FormFields>
                <FormLabel>Password</FormLabel>
                <Field
                  type="password"
                  name="password"
                  component={MyInput}
                  placeholder="Ex: demo"
                />
                {errors.password && touched.password && (
                  <Error>{errors.password}</Error>
                )}
              </FormFields>
              <Button
                type="submit"
                disabled={isSubmitting}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: '100%',
                      marginLeft: 'auto',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px',
                      borderBottomLeftRadius: '3px',
                      borderBottomRightRadius: '3px',
                    }),
                  },
                }}
              >
                Submit
              </Button>
            </Form>
          )}
          validationSchema={getLoginValidationSchema}
        />
      </FormWrapper>
    </Wrapper>
  );
};
