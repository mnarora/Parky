import {GoogleAPIWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import css from '../CSS/GoogleMap.module.css'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { address: '' ,
        showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
          lat: 18.5204,
          lng: 73.8567
      }
      }
    };

    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              console.log('Success', latLng);
              this.setState({ address });
              this.setState({ mapCenter: latLng });
          })
          .catch(error => console.error('Error', error));
      };
   
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
   
    render() {
      return (
          <div id="googleMap">

<PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={css.search}>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#ffffff', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            <ToastContainer position={toast.POSITION.TOP_CENTER}/>
          </div>
        )}
      </PlacesAutocomplete>
        <Map google={this.props.google}
            onClick={this.onMapClicked}
            initialCenter={{
                lat: this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
            }}
            center={{
                lat: this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
            }}
        >
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}
                  position={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                  }}
            />
   
          
        </Map>
        </div>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: ('AIzaSyBPThzljDTi_ZRsR-Xg3R05x2xP9OAieaE')
  })(MapContainer)