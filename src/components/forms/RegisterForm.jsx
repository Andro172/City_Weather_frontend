/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import ApiService from '../../services/api.service';
import { login } from '../../store/actions/userActions';

class RegisterForm extends React.Component {
  render() {
    let showCityId = false;
    return (
      <Row className="justify-content-center">
        <Col className="col-12">
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              city: '',
              cityId: '',
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(2, 'Usernames must have at least 2 characters')
                .max(35, "Usernames can't be longer than 35 characters")
                .required('Username is required'),
              email: Yup.string()
                .email('*Must be a valid email address')
                .required('*Email is required'),
              password: Yup.string()
                .min(6, 'Password must have at least 6 characters')
                .required('Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('You must confirm your password'),
              city: Yup.string().required('City is required'),
            })}
            onSubmit={async (form) => {
              try {
                if (!form.cityId) {
                  await ApiService.post('/cities/test-name', { name: form.city });
                  showCityId = false;
                }
                await ApiService.post('auth/register', { form });

                if (this.props.loginUser) {
                  // login user
                  const loginInfo = {
                    emailOrUsername: form.email,
                    password: form.password,
                  };
                  await this.props.login(loginInfo);
                }

                if (this.props.notify) {
                  this.props.notify();
                  this.props.showModal(false);
                }
              } catch (err) {
                if (err.response.status === 404) {
                  showCityId = true;
                }
              }
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <Row className="mb-5 mb-md-3">
                  <Col className="col-12 col-md-6 mb-5 mb-md-3">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className={`form-control ${
                        touched.email && errors.email ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col className="col-12 col-md-6">
                    <label htmlFor="username">Username</label>
                    <Field
                      type="text"
                      name="username"
                      className={`form-control ${
                        touched.username && errors.username ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>

                <Row className="mb-5 mb-md-3">
                  <Col className="col-12 col-md-6 mb-5 mb-md-3">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className={`form-control ${
                        touched.password && errors.password ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col className="col-12 col-md-6">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${
                        touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmPassword"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>

                <Row className="mb-3 mb-md-3">
                  <Col className="col mb-5 mb-md-3">
                    <label htmlFor="city">City</label>
                    <Field
                      type="text"
                      name="city"
                      className={`form-control ${
                        touched.city && errors.city ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="city"
                      className="invalid-feedback"
                    />
                  </Col>
                  {
                    showCityId ? (
                      <Col className="col-12 col-md-6">
                        <label htmlFor="cityId">City ID</label>
                        <Field
                          type="number"
                          name="cityId"
                          min="0"
                          step="1"
                          className={`form-control ${
                            touched.cityId && errors.cityId ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="cityId"
                          className="invalid-feedback"
                        />
                        <small>We coludn&apos;t find your city, please enter city id.</small>
                        <br />
                        <small>You can find city id after searching your city in link below.</small>
                        <br />
                        <small>It is the number in browser url.</small>
                        <br />
                        <a
                          href="https://openweathermap.org/city"
                          target="_blank"
                          rel="noopener noreferrer"
                        >

                          Open weather forecast
                        </a>
                      </Col>
                    ) : null
                  }
                </Row>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Please wait...' : this.props.submitTitle}
                  </Button>
                  {
                    !this.props.showModal && (
                      <div className="mt-lg-4 text-center">
                        <p className="text mt-4">
                          Already have an account?
                          <NavLink to="/login" className="ml-3">Login here!</NavLink>
                        </p>
                      </div>
                    )
                  }
                  {
                    this.props.showModal && (
                      <Button
                        variant="danger"
                        onClick={() => this.props.showModal(false)}
                        className="m-3"
                        disabled={isSubmitting}
                      >
                        Close
                      </Button>
                    )
                  }
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    );
  }
}

RegisterForm.propTypes = {
  login: PropTypes.func.isRequired,
  submitTitle: PropTypes.string.isRequired,
  loginUser: PropTypes.bool,
  showModal: PropTypes.func,
  notify: PropTypes.func,
};

RegisterForm.defaultProps = {
  showModal: false,
  loginUser: false,
  notify: false,
};

export default connect(null, { login })(RegisterForm);
