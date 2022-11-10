/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AppWrap from '../../../wrapper/AppWrap';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AddUser from './AddUser';

import { requestGet, requestDelete } from '../../../utils/Resquest';

import './Manage.scss';

function Manage() {
  const [users, setUsers] = useState([]);
  const [send, setSend] = useState(true);

  useEffect(() => {
    requestGet('/user/all')
      .then((res) => {
        setUsers(res.filter((user) => user.role !== 'administrator'));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [send]);

  const handleDelete = (id) => {
    requestDelete(`/user/${id}`, id)
      .then(() => {
        setSend(!send);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="app__admin">
      <AddUser send={ send } setSend={ setSend } />

      <div className="app__admin-table">
        <h3>Usuários cadastrados</h3>
        {console.log(users)}
        <TableContainer component={ Paper }>
          <Table sx={ { minWidth: 650 } } aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Função</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={ user.id }
                  sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                >
                  <TableCell
                    data-testid={
                      `admin_manage__element-user-table-item-number-${user.id}`
                    }
                    component="th"
                    scope="row"
                  >
                    {user.id}
                  </TableCell>
                  <TableCell
                    data-testid={ `admin_manage__element-user-table-name-${user.id}` }
                    component="th"
                    scope="row"
                  >
                    {user.name}
                  </TableCell>
                  <TableCell
                    data-testid={ `admin_manage__element-user-table-email-${user.id}` }
                    align="right"
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    data-testid={ `admin_manage__element-user-table-role-${user.id}` }
                    align="right"
                  >
                    {user.role}
                  </TableCell>
                  <TableCell
                    data-testid={ `admin_manage__element-user-table-remove-${user.id}` }
                    align="right"
                  >
                    <Button
                      component="button"
                      className="input-button"
                      variant="contained"
                      type="button"
                      data-testid="admin_manage__button-delete"
                      onClick={ () => handleDelete(user.id) }
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AppWrap(Manage, Header, Footer);
