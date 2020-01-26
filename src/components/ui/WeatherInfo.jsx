/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { MdRemoveCircle, MdLocationOn } from 'react-icons/md';
import { FaArrowUp, FaArrowDown, FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import Image from 'react-bootstrap/Image';

import io from '../../services/socket.service';

// images
import clear from '../../assets/weather/clear.png';
import clouds from '../../assets/weather/clouds.png';
import drizzle from '../../assets/weather/drizzle.png';
import rain from '../../assets/weather/rain.png';
import snow from '../../assets/weather/snow.png';
import tunderstorm from '../../assets/weather/tunderstorm.png';
import mist from '../../assets/weather/mist.png';

import ApiService from '../../services/api.service';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      city: null,
      loading: true,
      hovering: false,
    };

    this.getImageSrc = this.getImageSrc.bind(this);
    this.getCityInfo = this.getCityInfo.bind(this);
    this.removeCity = this.removeCity.bind(this);
    this.getIcon = this.getIcon.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getCityInfo();
  }

  componentWillUnmount() {
    this._isMounted = false;
    io.stopListening(this.props.id);
  }

  async getCityInfo() {
    const res = await ApiService.get(`cities/city_info/${this.props.id}`);
    // Finnish async task only if component is mounted
    if (this._isMounted) {
      this.setState({
        loading: false,
        city: res.data.city,
      });

      io.listenCity(this.props.id, (data) => {
        this.setState({ city: data });
      });
    }
  }

  /**
   * Get weather image based on weathercode
   * @param {number} code
   * @returns {*}
   */
  getImageSrc(code) {
    if (!code) {
      return null;
    }

    // get first and last number in code
    const firstNum = code.toString().charAt(0);
    const lastNum = code.toString().charAt(2);

    switch (firstNum) {
      case '2': return tunderstorm;
      case '3': return drizzle;
      case '5': return rain;
      case '6': return snow;
      case '7': return mist;
      case '8': {
        if (lastNum === '0') return clear;
        return clouds;
      }
      default: return null;
    }
  }

  /**
   * Get arrow icon based on temperature change
   * @param {string} info
   */
  getIcon(info) {
    switch (info) {
      case 'up': return <FaArrowUp className="light-blue-font" size="35" />;
      case 'down': return <FaArrowDown className="blue-font" size="35" />;
      default: return null;
    }
  }

  /**
   * Remove city from user account
   */
  async removeCity() {
    this.setState({ loading: true });
    await ApiService.put(`users/remove_city/${this.props.id}`);
    await this.props.getMyCities();
  }

  render() {
    return !this.state.loading ? (
      <div className="text-center tile">
        <div
          className="remove-icon"
          role="button"
          title={`Remove ${this.state.city.name}`}
          onClick={() => this.removeCity()}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        >
          {
            this.state.hovering && (
              <MdRemoveCircle
                color="white"
                className="mt-2"
                size="25"
              />
            )
          }
        </div>

        <h2 className="text-uppercase mb-0">
          <MdLocationOn className="blue-font mb-2 mr-1" />
          {this.state.city.name}
        </h2>

        <div>
          <div>
            <Image src={this.getImageSrc(this.state.city.weatherCode)} width="100" height="100" fluid />
            <h1 className="text-uppercase font-weight-bold">
              <FaTemperatureHigh className="blue-font mr-2" size="20" />
              {this.state.city.temp}
              {' '}
              °C
              {' '}
              {this.getIcon(this.state.city.tempGrows)}
            </h1>
            <h4 className="mt-3 mb-3">{this.state.city.description}</h4>
            <p className="mb-0">
              <WiHumidity className="blue-font mr-1" size="25" />
              humidity:
              {' '}
              {this.state.city.humidity}
              {' '}
              %
            </p>
            <p className="">
              <WiBarometer className="blue-font mr-1" size="25" />
              pressure:
              {' '}
              {this.state.city.pressure}
              {' '}
              hpa
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="p-5 text-center font-weight-bold">
        Loading...
      </div>
    );
  }
}

WeatherInfo.propTypes = {
  id: PropTypes.string.isRequired,
  getMyCities: PropTypes.func.isRequired,
};

export default WeatherInfo;
