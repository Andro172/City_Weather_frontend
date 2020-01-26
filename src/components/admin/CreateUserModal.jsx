import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { showNotification } from '../../store/actions/notificationActions';
import RegisterForm from '../forms/RegisterForm';

class CreateUserModal extends React.Component {
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
      text: 'User created succesfully!',
      title: 'Created',
    });
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        <Button
          variant="success"
          className="mt-1"
          onClick={() => this.showModal(true)}
        >
          Create New
        </Button>
        <Modal
          show={this.state.show}
          onHide={() => this.showModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          scrollable
          centered
        >
          <Modal.Body>
            <Container className="p-1 px-md-3 px-lg-5">
              <h3 className="mb-5 text-center">Create new user</h3>
              <RegisterForm
                submitTitle="Create"
                showModal={this.showModal}
                notify={this.notify}
              />
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

CreateUserModal.propTypes = {
  showNotification: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

export default connect(null, { showNotification })(CreateUserModal);
