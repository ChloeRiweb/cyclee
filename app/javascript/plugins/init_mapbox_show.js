import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

const initMapboxShow = () => {

  const mapElement = document.getElementById('map_show');

  if (mapElement) { // only build a map if there's a div#map to inject into

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_show',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      center: cyclingWaypoints[Math.round(cyclingWaypoints.length / 2.0)],
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
          'line-color': '#ef596e',
          'line-width': 4
        }
      });
    });
 }
}

export { initMapboxShow };
