import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

const initMapboxEdit = () => {

  const mapElement = document.getElementById('map_edit');


  if (mapElement) { // only build a map if there's a div#map to inject into

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
    const walkingWaypoints = JSON.parse(mapElement.dataset.walkingWaypoints);

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_edit',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: cyclingWaypoints[0],
      zoom: 12
    });

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
          'line-color': '#1e61ac',
          'line-width': 4
        }
      });
      map.addSource('walking', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: walkingWaypoints
          }
        }
      });
      map.addLayer({
        id: 'walking',
        type: 'line',
        source: 'walking',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#f36a6e',
          'line-width': 4
        }
      });
    });
 }
}

export { initMapboxEdit };
