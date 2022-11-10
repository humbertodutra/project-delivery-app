import React, { useState, useEffect } from 'react';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import AppWrap from '../../../wrapper/AppWrap';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

import AddUser from './AddUser';
import AdminTable from './AdminTable';

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
          <AdminTable users={ users } handleDelete={ handleDelete } />
        </TableContainer>
      </div>
    </div>
  );
}

export default AppWrap(Manage, Header, Footer);
