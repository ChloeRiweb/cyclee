import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { centerToPositionMarker } from './init_mapbox';


const getCurrentPosition = () => {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const addMarker = async (map) => {
  const position = await getCurrentPosition();
  map.flyTo({
    center: [position.coords.longitude, position.coords.latitude]
  });
}

const initMapboxShow = () => {

  const mapElement = document.getElementById('map_show');

  if (mapElement) { // only build a map if there's a div#map to inject into

    fillRideForm();

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
    const markersDanger = JSON.parse(mapElement.dataset.markersDanger);
    const zoom = mapElement.dataset.zoom ? mapElement.dataset.zoom : 13;
    const center = mapElement.dataset.center != "" ? JSON.parse(mapElement.dataset.center) : cyclingWaypoints[Math.round(cyclingWaypoints.length / 2.0)];
    const rideColor = mapElement.dataset.color;

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_show',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      center: center,
      zoom: zoom
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = marker.className;

      new mapboxgl.Marker(el)
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(map);
    });

    centerToPositionMarker(map);

    map.on('load', function() {
      map.addSource('cycling', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: cyclingWaypoints
          }
        }
      });

      map.addLayer({
        id: 'cycling',
        type: 'line',
        source: 'cycling',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': rideColor,
          'line-width': 4
        }
      });
    });

    if (markersDanger) {
      markersDanger.forEach((markerDanger) => {
        const el = document.createElement('div');
        el.className = `marker-${markerDanger.cat}`;
        new mapboxgl.Marker(el, {offset: [20, 20]})
          .setLngLat([ markerDanger.lng, markerDanger.lat ])
          .addTo(map);
      });
    }
  }
 }

const fillRideForm = async () => {
  const position = await getCurrentPosition();
  const latInput = document.getElementById('danger_latitude');
  const longInput = document.getElementById('danger_longitude');
  if (latInput) {
    latInput.value = position.coords.latitude;
    longInput.value = position.coords.longitude;
  }
}

export { initMapboxShow };
