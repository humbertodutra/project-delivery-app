/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import AppWrap from '../../../wrapper/AppWrap';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

import adminRegisterSchema from '../../../validations/adminRegister';
import { requestPost } from '../../../utils/Resquest';

import './Manage.scss';

function Manage() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'customer',
  });

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [passed, setPassed] = useState({
    name: false, email: false, password: false, role: false,
  });

  const validator = (newForm) => {
    const valReturn = adminRegisterSchema.safeParse(newForm);

    if (valReturn.success) {
      setPassed({ name: true, email: true, password: true, role: true });
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

  const register = async (event) => {
    event.preventDefault();

    try {
      const { email, role } = await requestPost('/admin/register', form);
      console.log(email, role);

      setForm({ name: '', email: '', password: '', role: 'customer' });
      setPassed({ name: false, email: false, password: false, role: false });
      setIsError(false);
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
    <div className="app__admin">
      <div className="box-shadow app__admin-register">

        <h3>Cadastrar novo usuário</h3>

        <div className="app__flex app__admin-register-inputs">

          <TextField
            inputProps={ {
              'data-testid': 'admin_manage__input-name',
              name: 'name',
            } }
            className="input-field"
            color="primary"
            label="Nome"
            type="text"
            placeholder="Ex: Manoel Souza"
            name="name"
            value={ form.name }
            onChange={ handleChange }
          />

          <TextField
            inputProps={ {
              'data-testid': 'admin_manage__input-email',
              name: 'email',
            } }
            className="input-field"
            color="primary"
            label="Email"
            type="text"
            placeholder="email@gmail.com"
            name="email"
            value={ form.email }
            onChange={ handleChange }
          />

          <TextField
            inputProps={ {
              'data-testid': 'admin_manage__input-password',
              name: 'password',
            } }
            className="input-field"
            label="Senha"
            type="password"
            placeholder="********"
            data-testid="admin_manage__input-password"
            name="password"
            value={ form.password }
            onChange={ handleChange }
          />

          <FormControl sx={ { minWidth: 150 } }>
            <InputLabel id="select-label">Função</InputLabel>

            <Select
              labelId="select-label"
              id="simple-select"
              native
              inputProps={ {
                'data-testid': 'admin_manage__select-role',
                name: 'role',
              } }
              color="primary"
              label="Funcao"
              name="role"
              value={ form.role }
              onChange={ handleChange }
            >
              <option value="customer">Cliente</option>
              <option value="seller">Vendedor</option>
              <option value="administrator">Administrador</option>
            </Select>

          </FormControl>

          <Button
            component="button"
            className="input-button"
            variant="contained"
            type="button"
            data-testid="admin_manage__button-register"
            disabled={ !passed.name || !passed.email || !passed.password || !passed.role }
            onClick={ register }
          >
            Registrar
          </Button>

        </div>
      </div>
      <div className="app__admin-error">
        <p
          data-testid="admin_manage__element-invalid-register"
          style={ { display: isError ? 'block' : 'none' } }
        >
          {error}
        </p>
      </div>
    </div>
  );
}

export default AppWrap(Manage, Header, Footer);
