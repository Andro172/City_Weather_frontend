import React from 'react';
import Container from 'react-bootstrap/Container';
import UserListGroup from '../components/admin/UserListGroup';

function UserList() {
  return (
    <div className="admin">
      <Container>
        <UserListGroup />
      </Container>
    </div>
  );
}

export default UserList;
