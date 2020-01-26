/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../store/actions/userActions';

class LoginForm extends React.Component {
  render() {
    return (
      <Container className="mt-lg-4">
        <Row className="justify-content-center">
          <Col className="col-12 col-sm-11 col-md-6 col-lg-4">
            <Formik
              initialValues={{ emailOrUsername: '', password: '' }}
              validationSchema={Yup.object({
                emailOrUsername: Yup.string()
                  .required('*Username or Email is required'),
                password: Yup.string()
                  .min(6, 'Password must have at least 6 characters')
                  .required('Password is required'),
              })}
              onSubmit={async (form) => {
                await this.props.login(form);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email or Username</label>
                    <Field
                      type="text"
                      name="emailOrUsername"
                      className={`form-control ${
                        touched.emailOrUsername && errors.emailOrUsername ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="emailOrUsername"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mt-5 mt-lg-5">
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
                  </div>


                  <div className="text-center mt-4 mt-lg-5 mb-3">
                    <Button
                      type="submit"
                      variant="success"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Please wait...' : 'Submit'}
                    </Button>
                  </div>

                  <div className="mt-lg-4 text-center">
                    <p className="text mt-4">
                      Don&apos;t have an account?
                      <NavLink to="/register" className="ml-3">Register here!</NavLink>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginForm);
