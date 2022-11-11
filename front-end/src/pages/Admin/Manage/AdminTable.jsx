import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function AdminTable({ users, handleDelete }) {
  return (
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
  );
}

AdminTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
    }),
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AdminTable;
