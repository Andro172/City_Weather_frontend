/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import ApiService from '../../services/api.service';
import { showNotification } from '../../store/actions/notificationActions';

class UpdatePassword extends React.Component {
  render() {
    return (
      <div className="row mt-3">
        <div className="col-12">
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={Yup.object({
              oldPassword: Yup.string()
                .min(6, 'Password must have at least 6 characters')
                .required('Old Password is required'),
              newPassword: Yup.string()
                .min(6, 'Password must have at least 6 characters')
                .required('New Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('You must confirm your password'),
            })}
            onSubmit={async (form) => {
              try {
                const res = await ApiService.put('/users/change_password', { form });
                if (res.status === 200) {
                  this.props.showNotification({
                    text: 'Password changed successfully',
                    title: 'Update',
                    type: 'success',
                  });
                }
              } catch (err) {
                // Error handled in ApiService
              }
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <Row className="mt-3 mb-5 mb-lg-3">
                  <Col>
                    <label htmlFor="password">Old Password</label>
                    <Field
                      type="password"
                      name="oldPassword"
                      className={`form-control ${
                        touched.oldPassword && errors.oldPassword ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="oldPassword"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>

                <Row className="mb-5 mb-lg-3">
                  <Col className="col-12 col-md-6 mb-5 mb-md-3">
                    <label htmlFor="password">New Password</label>
                    <Field
                      type="password"
                      name="newPassword"
                      className={`form-control ${
                        touched.newPassword && errors.newPassword ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="newPassword"
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

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="success"
                    className="mt-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Please wait...' : 'Change'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

UpdatePassword.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default connect(null, { showNotification })(UpdatePassword);
