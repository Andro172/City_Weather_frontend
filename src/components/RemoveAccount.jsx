import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ApiService from '../services/api.service';
import { logout } from '../store/actions/userActions';

class RemoveAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
    };

    this.delete = this.delete.bind(this);
  }

  /**
   * Delete user accoun
   */
  async delete() {
    try {
      this.setState({ isSubmitting: true });
      await ApiService.delete('users/delete_me');
      this.props.logout();
    } catch (err) {
      // eslint-disable-next-line no-console
    }
  }

  render() {
    const { isSubmitting } = this.state;
    return (
      <span>
        <Button
          variant="danger"
          disabled={isSubmitting}
          onClick={() => this.delete()}
        >
          {isSubmitting ? 'Please wait...' : 'Remove Account'}
        </Button>
      </span>
    );
  }
}

RemoveAccount.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(RemoveAccount);
