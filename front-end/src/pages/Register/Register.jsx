import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Images from '../../constants/images';
import AppWrap from '../../wrapper/AppWrap';
import './Register.scss';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    console.log(newForm);
    setForm(newForm);
  };

  return (
    <div className="app__register">

      <img src={ Images.Logo } alt="logo" className="app__register-logo" />

      <div className="app__register-card">

        <h1 className="app__register-title">Cadastro</h1>

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
          variant="contained"
          className="input-button"
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
}

export default AppWrap(Register, null, null, null);
