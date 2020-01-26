import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { init } from './store/actions/userActions';
import Notifications from './components/ui/Notifications';
import AppRouter from './router/router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  /**
   * On mount initialize user
   */
  async componentDidMount() {
    await this.props.init();
    this.setState({ loading: false });
  }

  render() {
    return !this.state.loading ? (
      <div>
        <Notifications />
        <AppRouter />
      </div>
    ) : null;
  }
}

App.propTypes = {
  init: PropTypes.func.isRequired,
};

export default connect(null, { init })(App);
