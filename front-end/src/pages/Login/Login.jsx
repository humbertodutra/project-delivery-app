import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Images from '../../constants/images';
import AppWrap from '../../wrapper/AppWrap';

import loginSchema from '../../validations/login';
import { requestPost, setToken } from '../../utils/Resquest';

import './Login.scss';

function Login() {
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

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token } = await requestPost('/login', form);
      setToken(token);
      console.log(token);
      navigate('/customer/products');
    } catch ({ response: { data: { message } } }) {
      console.log(message);
      setIsError(true);
      setError(message);
    }
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
          onClick={ (event) => login(event) }
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
