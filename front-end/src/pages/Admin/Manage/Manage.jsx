/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import AppWrap from '../../../wrapper/AppWrap';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

import './Manage.scss';

function Manage() {
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

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
              defaultValue="client"
            >
              <option value="client">Cliente</option>
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
