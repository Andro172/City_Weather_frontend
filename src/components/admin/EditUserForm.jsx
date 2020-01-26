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
import ApiService from '../../services/api.service';

class EditUserForm extends React.Component {
  render() {
    let showCityId = false;
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-lg-7">
          <Formik
            initialValues={{
              _id: this.props.user._id,
              username: this.props.user.username,
              email: this.props.user.email,
              city: this.props.user.cityName,
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
              city: Yup.string(),
            })}
            onSubmit={async (form) => {
              try {
                if (!form.cityId && form.city) {
                  await ApiService.post('/cities/test-name', { name: form.city });
                  showCityId = false;
                }
                await ApiService.put('admin/update_user', { form });

                // Show notification and close modal
                if (this.props.notify) {
                  this.props.notify();
                  this.props.showModal(false);
                }
              } catch (err) {
                // If can't find city by name, show cityId field
                if (err.response.status === 404) {
                  showCityId = true;
                }
              }
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <Row className="mb-5">
                  <Col className="col-12 col-md-6">
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
                  <Col className="col-12 col-md-6 mt-5 mt-md-0">
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

                <Row className="mb-4">
                  <Col>
                    <label htmlFor="city">Add City</label>
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
                      <Col className="col-12 col-md-6 mt-5 mt-md-0">
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
                    this.props.showModal && (
                      <Button
                        onClick={() => this.props.showModal(false)}
                        variant="danger"
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
        </div>
      </div>
    );
  }
}

EditUserForm.propTypes = {
  showModal: PropTypes.func,
  submitTitle: PropTypes.string.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    cityName: PropTypes.string,
  }).isRequired,
  notify: PropTypes.func,
};

EditUserForm.defaultProps = {
  showModal: false,
  notify: false,
};

export default EditUserForm;
