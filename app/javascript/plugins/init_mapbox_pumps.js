import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { fitMapToMarkers, centerToPositionMarker } from './init_mapbox';


const initMapboxPumps = () => {

  const mapElement = document.getElementById('map_pumps');

  if (mapElement) { // only build a map if there's a div#map to inject into

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
    const pumps = JSON.parse(mapElement.dataset.pumps);

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_pumps',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      zoom: 13
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

// Add pump markers to the map
    if (pumps) {
      pumps.forEach((pump) => {
        const el = document.createElement('div');
        el.className = "marker_pump";
        new mapboxgl.Marker(el)
          .setLngLat([ pump.lng, pump.lat ])
          .addTo(map);
      });
      fitMapToMarkers(map, pumps);
      centerToPositionMarker(map);
    }
  }
 }

export { initMapboxPumps };
