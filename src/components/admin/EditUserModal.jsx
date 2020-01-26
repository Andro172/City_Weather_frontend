import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import { showNotification } from '../../store/actions/notificationActions';
import EditUserForm from './EditUserForm';

class EditUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.showModal = this.showModal.bind(this);
    this.notify = this.notify.bind(this);
  }

  /**
   * Show modal
   * @param {boolean} show
   */
  showModal(show) {
    this.setState({ show });
  }

  /**
   * Show notification and get users
   */
  notify() {
    this.props.showNotification({
      type: 'success',
      text: 'User updated succesfully!',
      title: 'Updated',
    });
    this.props.getUsers();
  }

  render() {
    return (
      <span>
        <MdEdit
          className="icon orange-font mt-1"
          size="20"
          onClick={() => this.showModal(true)}
        />

        <Modal
          show={this.state.show}
          onHide={() => this.showModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          scrollable
          centered
        >

          <Modal.Body>
            <h3 className="mb-5 text-center">
              Update
              {' '}
              {this.props.user.username}
            </h3>
            <EditUserForm
              submitTitle="Update"
              user={this.props.user}
              showModal={this.showModal}
              notify={this.notify}
            />
            <br />
          </Modal.Body>
        </Modal>
      </span>
    );
  }
}

EditUserModal.propTypes = {
  showNotification: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

export default connect(null, { showNotification })(EditUserModal);
