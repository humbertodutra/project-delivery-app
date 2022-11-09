import React, { useContext, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { HomeerContext } from '../../context/Provider';

import Images from '../../constants/images';
import Roles from '../../constants/roles';
import AppWrap from '../../wrapper/AppWrap';

import { requestGet, requestPost, setHeaderToken } from '../../utils/Resquest';
import loginSchema from '../../validations/login';

import './Login.scss';

function Login() {
  const {
    user: {
      currentUser,
      setUser,
    },
    login: {
      setIsSignedIn,
    },
  } = useContext(HomeerContext);

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [passed, setPassed] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const validator = (newForm) => {
    const valReturn = loginSchema.safeParse(newForm);
    console.log(valReturn);

    if (valReturn.success) {
      setPassed({ email: true, password: true });
      setIsError(false);
      return;
    }

    const { error: { issues } } = valReturn;
    const errorMsg = [];

    issues.forEach((issue) => {
      errorMsg.push(issue.message);
      setPassed({ ...passed, [issue.path[0]]: false });
    });

    setIsError(true);
    setError(errorMsg.join(' e '));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };

    setForm(newForm);
    if (value) return validator(newForm);

    setIsError(false);
    setPassed({ ...passed, [name]: false });
  };

  const loginUser = async (token) => {
    const { name, email, role } = await requestGet('/user');
    await setUser({ ...currentUser, name, email, role, token });

    setIsSignedIn(true);
    navigate(Roles[role]);
  };

  const getToken = async (event) => {
    event.preventDefault();

    try {
      const { token } = await requestPost('/login', form);

      setHeaderToken(token);
      loginUser(token);
    } catch (err) {
      if (err.response) {
        const { response: { data: { message } } } = err;
        setError(message);
        setIsError(true);
      }

      // setError(err.message);
      // setIsError(true);
      // console.log(err);
    }
  };

  useEffect(() => {
    console.log(currentUser);
    if (currentUser.token) {
      navigate('/customer/products');
    }
  }, []);

  return (
    <div className="app__flex app__login">
      <img src={ Images.Logo } alt="logo" className="app__login-logo" />

      <div className="app__login-card app__flex box-shadow">
        <h1>Bem vindo! 😎 </h1>
        <TextField
          inputProps={ {
            'data-testid': 'common_login__input-email',
            name: 'email',
            value: form.email,
            onChange: handleChange,
          } }
          className="input-field"
          color="primary"
          label="Email"
          type="text"
          placeholder="email@gmail.com"
        />
        <TextField
          inputProps={ {
            'data-testid': 'common_login__input-password',
            name: 'password',
            value: form.password,
            onChange: handleChange,
          } }
          className="input-field"
          label="Senha"
          type="password"
          placeholder="********"
          data-testid="common_login__input-password"
        />
        <Button
          component="button"
          disabled={ !passed.email || !passed.password }
          className="input-button"
          variant="contained"
          type="button"
          data-testid="common_login__button-login"
          onClick={ (event) => getToken(event) }
        >
          Entrar
        </Button>
        <Button
          component="button"
          className="input-button"
          variant="outlined"
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tem conta?
        </Button>
      </div>

      <div className="app__login-error">
        <p
          data-testid="common_login__element-invalid-email"
          style={ { display: isError ? 'block' : 'none' } }
        >
          {error}
        </p>
      </div>
    </div>
  );
}

export default AppWrap(Login, null, null, null);
