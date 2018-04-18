/**
 * Created by N56 on 15.04.2018.
 */

import "openlayers/css/ol.css"
import './popup.css'

var ol = require('openlayers');
// OL map

var placeLayer = new ol.layer.Vector({
  style: function (f) {
    var fill = new ol.style.Fill({
      color: f.get('color')
    });
    var stroke = new ol.style.Stroke({
      color: '#3399CC',
      width: 1.25
    });
    var styles = [
      new ol.style.Style({
        image: new ol.style.Circle({
          fill: fill,
          stroke: stroke,
          radius: 5
        }),
        fill: fill,
        stroke: stroke
      })
    ];
    return styles;
  },
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),

    //url: "http://www.geoforall.org/locations/OSGEoLabs.json" raisesesource at http://www.geoforall.org/locations/
    //Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote rOSGEoLabs.json. (Reason: CORS header 'Access-Control-Allow-Origin' missing).
    url: "http://localhost:3005/features"
  })
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    placeLayer
  ],
  view: new ol.View({
    center: [949282, 6002552],
    zoom: 4
  })
});



var popupElement = document.getElementById('popup');
var popup = new ol.Overlay({
  element: popupElement,
  id: 'popup',
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});
map.addOverlay(popup);


export {
  map,
  placeLayer,
  popup
}