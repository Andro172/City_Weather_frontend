import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';

class AdminRoute extends React.Component {
  render() {
    const isAdmin = this.props.roles.indexOf('admin') !== -1;
    return isAdmin ? (
      <ProtectedRoute path={this.props.path} component={this.props.component} />
    ) : (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
}

AdminRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  roles: state.user.roles,
});

export default connect(mapStateToProps, null)(AdminRoute);
