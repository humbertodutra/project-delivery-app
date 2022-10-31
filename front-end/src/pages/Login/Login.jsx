import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { validate } from 'front-end-validation';
import { z } from 'zod';
import Images from '../../constants/images';
import AppWrap from '../../wrapper/AppWrap';

import loginSchema from '../../validations/login';

import './Login.scss';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [passed, setPassed] = useState({ email: false, password: false });

  const validator = () => {
    const myReturn = loginSchema.safeParse(form);
    console.log(myReturn);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (value) return validator();

    setIsError(false);
    setPassed({ ...passed, [name]: false });
  };

  return (
    <div className="app__flex app__login">
      <img src={ Images.Logo } alt="logo" className="app__login-logo" />

      <div className="app__login-card app__flex box-shadow">
        <h1>Bem vindo! 🙂</h1>
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
        >
          Entrar
        </Button>
        <Button
          component="button"
          className="input-button"
          variant="outlined"
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tem conta?
        </Button>
      </div>

      <p
        data-testid="common_login__element-invalid-email"
        style={ { display: isError ? 'block' : 'none' } }
      >
        { error }
      </p>
    </div>
  );
}

export default AppWrap(Login, null, null, null);
