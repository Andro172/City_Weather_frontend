/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { hideNotification } from '../../store/actions/notificationActions';

class Notifications extends React.Component {
  render() {
    const {
      type,
      show,
      title,
      text,
    } = this.props;
    const variant = type === 'success' ? 'success' : 'danger';
    const style = {
      position: 'fixed',
      bottom: '2rem',
      right: '3rem',
      zIndex: '9999999',
    };
    return (
      <Alert
        show={show}
        variant={variant}
        dismissible
        onClose={() => this.props.hideNotification()}
        style={style}
      >
        <Alert.Heading>
          <small>{title}</small>
        </Alert.Heading>
        <p>
          {text}
        </p>
      </Alert>
    );
  }
}

Notifications.propTypes = {
  hideNotification: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  show: state.notifications.show,
  text: state.notifications.text,
  type: state.notifications.type,
  title: state.notifications.title,
});

export default connect(mapStateToProps, { hideNotification })(Notifications);
