import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Row, Col} from 'react-bootstrap';
import {Sibar} from './sidebar/view/Sibar';
import {map, placeLayer, popup} from './map/Map';
import {visiblePlacesAction,  selectAction} from './sidebar/action/Action';
import {Provider, connect} from 'react-redux';
import {store} from './sidebar/model/Store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
function placeName(place) {
  // extract text from link
  return place.userName.replace(/<(?:.|\n)*?>/g, '');
}


// OL callbacks
function updateVisiblePlaces() {
  var extent = map.getView().calculateExtent(map.getSize());
  var places = placeLayer.getSource().getFeaturesInExtent(extent).map(function(feature) {
    return feature.getProperties();
  });

  // Update state in Redux store
  store.dispatch(visiblePlacesAction(places));
}

/**
 *
 * @param {ol.mapBrowserEvent} e
 */
function mapClick(e) {
  var coordinate = e.pixel,
    features = [];

  map.forEachFeatureAtPixel(coordinate, function (feature) {
    features.push(feature);
  });
  if(features.length > 0) {
    var popupElement = document.getElementById("popup-content");
    popupElement.innerHTML = features[0].getProperties().userName + ' / ' + features[0].getProperties().email;
    popup.setPosition(features[0].getGeometry().getFirstCoordinate());
  }
}

placeLayer.on('change', updateVisiblePlaces);
map.on('moveend', updateVisiblePlaces);
map.on('singleclick', mapClick);
/**
 *
 * @param {Sting} name
 */
function updateSelection(name) {
  var extent = map.getView().calculateExtent(map.getSize());
  var selected = placeLayer.getSource().getFeaturesInExtent(extent).filter(function(feature) {
    return name === placeName(feature.getProperties());
  });
  if (selected.length > 0) {
    var feature = selected[0];
    var popupElement = document.getElementById("popup-content");
    popupElement.innerHTML = feature.getProperties().userName + ' / ' + feature.getProperties().email;
    popup.setPosition(feature.getGeometry().getFirstCoordinate());
  }
}
// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    places: state.places,
    selected: state.selected
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onSelectClick: function(e) {
      var name = e.target.textContent;
      dispatch(selectAction(name));
      console.log(name);
      // Update map
      updateSelection(name);
    }
  };
}

var Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sibar);

class App extends Component {
  componentDidMount() {
    map.setTarget(document.getElementById("map"));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Provider store={store}>
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={8}>
                <Sidebar/>
              </Col>
              <Col xs={6} md={4}>
                <div id="map" className="map"> </div>
              </Col>
            </Row>
          </Grid>
        </Provider>
      </div>
    );
  }
}
export default App;
