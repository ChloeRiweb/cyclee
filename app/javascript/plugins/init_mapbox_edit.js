import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

const initMapboxEdit = () => {

  const mapElement = document.getElementById('map_edit');


  if (mapElement) { // only build a map if there's a div#map to inject into

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
    const drivingWaypoints = JSON.parse(mapElement.dataset.drivingWaypoints);

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
          'line-color': '#a2db60',
          'line-width': 4
        }
      });
      map.addSource('driving', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: drivingWaypoints
          }
        }
      });
      map.addLayer({
        id: 'driving',
        type: 'line',
        source: 'driving',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#db8f60',
          'line-width': 4
        }
      });
    });
 }
}

export { initMapboxEdit };
