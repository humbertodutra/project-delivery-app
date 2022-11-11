import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

import './UserRow.scss';

function UserRow({ id, email, name, role }) {
  return (
    <tr className="user-row">
      <td>{id}</td>
      <td>{email}</td>
      <td>{name}</td>
      <td>{role}</td>
      <td>
        <Button variant="contained" color="primary">
          Edit
        </Button>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default UserRow;
