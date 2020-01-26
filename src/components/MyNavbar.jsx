import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/userActions';

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      scrollPos: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Save current scroll position and compare to previous
   */
  handleScroll() {
    const { scrollPos } = this.state;
    const currPos = window.pageYOffset;

    if (scrollPos === currPos) {
      return;
    }

    this.setState({
      scrollPos: currPos,
      show: currPos < scrollPos,
    });
  }

  render() {
    const active = this.state.show ? 'activeNav' : 'hiddenNav';
    return (
      <div>
        <Navbar
          variant="dark"
          fixed="top"
          expand="md"
          className={`${active} nav-info`}
        >
          <Navbar.Brand className="brand ml-lg-5 ml-md-3">
            <NavLink className="link" to="/">City Weather</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle className="mr-2" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              this.props.isLoggedIn ? (
                <Nav className="ml-auto  mr-lg-5">
                  {
                    this.props.roles.indexOf('admin') !== -1 && (
                      <NavLink className="link" to="/admin">
                        User List
                      </NavLink>
                    )
                  }
                  <NavLink className="link" to="/account">
                    {this.props.username}
                  </NavLink>
                  <NavLink
                    className="link"
                    to="/login"
                    onClick={() => this.props.logout()}
                  >
                    Logout
                  </NavLink>
                </Nav>
              ) : (
                <Nav className="ml-auto mr-lg-5">
                  <NavLink className="link" to="/login">Login</NavLink>
                  <NavLink className="link" to="/register">Register</NavLink>
                </Nav>
              )
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

MyNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.loggedIn,
  username: state.user.username,
  roles: state.user.roles,
});

export default connect(mapStateToProps, { logout })(MyNavbar);
