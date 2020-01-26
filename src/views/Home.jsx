import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyCities } from '../store/actions/cityActions';
import WeatherInfo from '../components/ui/WeatherInfo';
import AddCityModal from '../components/AddCityModal';

class Home extends React.Component {
  async componentDidMount() {
    await this.props.getMyCities();
  }

  render() {
    return !this.props.loading && (
      <div className="home">
        <Row className="ml-1 ml-md-5 pl-md-3 mr-1 mr-md-5 pr-md-3">
          {
            this.props.cities.map((city) => (
              <Col className="col-12 col-sm-6 col-lg-4 mb-5" key={city}>
                <WeatherInfo id={city} getMyCities={this.props.getMyCities} />
              </Col>
            ))
          }
          <Col className="col-2 col-md-1">
            <AddCityModal getMyCities={this.props.getMyCities} />
          </Col>
        </Row>
      </div>

    );
  }
}

Home.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  getMyCities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.city.cities,
  loading: state.city.loading,
});

export default connect(mapStateToProps, { getMyCities })(Home);
