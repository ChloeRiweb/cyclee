import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { fitMapToMarkers, centerToPositionMarker } from './init_mapbox';


const initMapboxRepairers = () => {

  const mapElement = document.getElementById('map_repairers');

  if (mapElement) { // only build a map if there's a div#map to inject into

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
    const repairers = JSON.parse(mapElement.dataset.repairers);

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_repairers',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      zoom: 13
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

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

// Add repairer markers to the map
    if (repairers) {
      repairers.forEach((repairer) => {
        const el = document.createElement('div');
        el.className = "marker_repairer";
        new mapboxgl.Marker(el)
          .setLngLat([ repairer.lng, repairer.lat ])
          .addTo(map);
      });
      fitMapToMarkers(map, repairers);
      centerToPositionMarker(map);

    }
  }
 }

export { initMapboxRepairers };
