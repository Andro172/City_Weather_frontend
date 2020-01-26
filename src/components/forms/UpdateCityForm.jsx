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

class UpdateCityForm extends React.Component {
  render() {
    let showCityId = false;
    return (
      <div className="row mt-3">
        <div className="col-12">
          <Formik
            initialValues={{
              city: '',
              cityId: '',
            }}
            validationSchema={Yup.object({
              city: Yup.string().required('City is required'),
            })}
            onSubmit={async (form) => {
              try {
                if (!form.cityId) {
                  await ApiService.post('/cities/test-name', { name: form.city });
                  showCityId = false;
                }
                const res = await ApiService.put('/users/add_city', { form });
                if (res.status === 200) {
                  this.props.showNotification({
                    text: 'City added successfully',
                    title: 'Update',
                    type: 'success',
                  });
                  this.props.refresh();
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
                <Row className="m-3 mb-5">
                  <Col>
                    <label htmlFor="city">New City</label>
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

                <div className="mt-3 text-center">
                  <Button
                    type="submit"
                    variant="success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Please wait...' : 'Add'}
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

UpdateCityForm.propTypes = {
  showNotification: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default connect(null, { showNotification })(UpdateCityForm);
