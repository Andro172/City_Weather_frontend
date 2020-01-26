import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdDelete } from 'react-icons/md';
import ApiService from '../../services/api.service';
import { showNotification } from '../../store/actions/notificationActions';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';

class UserListGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.deleteUser = this.deleteUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  async componentDidMount() {
    await this.getUsers();
  }

  /**
   * Get all non admin users
   */
  async getUsers() {
    try {
      const res = await ApiService.get('/admin/all_users');
      this.setState({ users: res.data.users });
    } catch (err) {
      // Error handled in ApiService
    }
  }

  /**
   * Delete user
   * @param {string} id
   */
  async deleteUser(id) {
    try {
      await ApiService.delete(`/admin/delete_user/${id}`);
      // Show notification
      this.props.showNotification({
        type: 'success',
        text: 'User deleted succesfully!',
        title: 'Delete',
      });
      await this.getUsers();
    } catch (err) {
      // Error handled in ApiService
    }
  }

  render() {
    return (
      <div className="table-wrapper">
        <div className="table-title">
          <Row>
            <Col className="text-left">
              <h3>Manage Users</h3>
            </Col>
            <Col className="text-right">
              <CreateUserModal getUsers={this.getUsers} />
            </Col>
          </Row>
        </div>
        <Table responsive hover className="text-center">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Cities</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
            this.state.users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.cities}</td>
                <td>
                  <EditUserModal getUsers={this.getUsers} user={user} />
                  <MdDelete
                    className="icon red-font ml-3"
                    size="20"
                    onClick={() => this.deleteUser(user._id)}
                  />
                </td>
              </tr>
            ))
            }
            {this.state.users.length === 0 && (
              <p>No other users!</p>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

UserListGroup.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default connect(null, { showNotification })(UserListGroup);
