import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

const initMapboxEdit = () => {

  const mapElement = document.getElementById('map_edit');
  console.log(mapElement)


  if (mapElement) { // only build a map if there's a div#map to inject into

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
    const cyclingWaypointsAlt = JSON.parse(mapElement.dataset.cyclingWaypointsAlt);

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_edit',
      style: 'mapbox://styles/mapbox/streets-v10',
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
          'line-color': '#193c60',
          'line-width': 4
        }
      });
      map.addSource('cycling_Alt', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: cyclingWaypointsAlt
          }
        }
      });
      map.addLayer({
        id: 'cycling_Alt',
        type: 'line',
        source: 'cycling_Alt',
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

export { initMapboxEdit };
