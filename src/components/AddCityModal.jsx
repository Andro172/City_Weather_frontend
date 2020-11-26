import React from 'react';
import PropTypes from 'prop-types';
import { MdAddCircle } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import UpdateCityForm from './forms/UpdateCityForm';

class AddCityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.showModal = this.showModal.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  /**
   * Show modal
   * @param {boolean} show
   */
  showModal(show) {
    this.setState({ show });
  }

  /**
   * Refresh city list
   */
  refresh() {
    this.showModal(false);
    this.props.getMyCities();
  }

  render() {
    return (
      <span>
        <MdAddCircle
          color="white"
          className="icon mt-1"
          size="30"
          title="Track new city"
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
              Track weather for another city!
            </h3>
            <UpdateCityForm refresh={this.refresh} />
            <br />
          </Modal.Body>
        </Modal>
      </span>
    );
  }
}

AddCityModal.propTypes = {
  getMyCities: PropTypes.func.isRequired,
};

export default AddCityModal;
