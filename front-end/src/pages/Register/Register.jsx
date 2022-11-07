import { Button, TextField } from '@mui/material';
import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { HomeerContext } from '../../context/Provider';
import Images from '../../constants/images';
import Roles from '../../constants/roles';
import AppWrap from '../../wrapper/AppWrap';

import registerSchema from '../../validations/register';

import { requestPost, requestGet, setHeaderToken } from '../../utils/Resquest';
import './Register.scss';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [passed, setPassed] = useState({ name: false, email: false, password: false });

  const {
    user: {
      currentUser,
      setUser,
    },
    login: {
      setIsSignedIn,
    },
  } = useContext(HomeerContext);

  const validator = (newForm) => {
    const valReturn = registerSchema.safeParse(newForm);

    if (valReturn.success) {
      setPassed({ name: true, email: true, password: true });
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

  const register = async (event) => {
    event.preventDefault();

    try {
      const { email, password } = await requestPost('/register', form);

      const { token } = await requestPost('/login', { email, password });
      setHeaderToken(token);
      loginUser(token);
    } catch (err) {
      if (err.response) {
        const { response: { data: { message } } } = err;
        setError(message);
        setIsError(true);
      }

      setError(err.message);
      setIsError(true);
      console.log(err);
    }
  };

  return (
    <div className="app__register">
      <img src={ Images.Logo } alt="logo" className="app__register-logo" />

      <div className="app__flex box-shadow app__register-card">

        <h1>E ai novato! 🍺 </h1>

        <TextField
          inputProps={ {
            'data-testid': 'common_register__input-name',
            name: 'name',
            value: form.name,
            onChange: handleChange,
          } }
          className="input-field"
          color="primary"
          label="Nome"
          type="text"
          placeholder="Ex: Manoel Souza"
        />
        <TextField
          inputProps={ {
            'data-testid': 'common_register__input-email',
            name: 'email',
            value: form.email,
            onChange: handleChange,
          } }
          className="input-field"
          color="primary"
          label="Email"
          type="email"
          placeholder="email@gmail.com"
        />
        <TextField
          inputProps={ {
            'data-testid': 'common_register__input-password',
            name: 'password',
            value: form.password,
            onChange: handleChange,
          } }
          className="input-field"
          color="primary"
          label="Senha"
          type="password"
          placeholder="******"
        />
        <Button
          className="input-button"
          disabled={ !passed.name || !passed.email || !passed.password }
          variant="contained"
          data-testid="common_register__button-register"
          onClick={ (event) => register(event) }
        >
          Cadastrar
        </Button>
      </div>

      <div className="app__login-error">
        <p
          data-testid="common_register__element-invalid_register"
          style={ { display: isError ? 'block' : 'none' } }
        >
          { error }
        </p>
      </div>
    </div>
  );
}

export default AppWrap(Register, null, null, null);
