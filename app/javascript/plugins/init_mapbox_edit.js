import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
// import { centerToPositionMarker } from './init_mapbox';


const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 20, maxZoom: 12, duration: 0 });
};

const centerToPositionMarker = (map) => {
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    fitBoundsOptions: {
      linear: false
    },
    trackUserLocation: true
  });
  map.addControl(geolocate);
  map.on('load', function() {
    geolocate.trigger();
  });

  return geolocate;
}


const initMapboxEdit = () => {

  const mapElement = document.getElementById('map_edit');

  if (mapElement) { // only build a map if there's a div#map to inject into

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
    const cyclingWaypointsAlt = JSON.parse(mapElement.dataset.cyclingWaypointsAlt);
    const duration = JSON.parse(mapElement.dataset.duration);
    const durationAlt = JSON.parse(mapElement.dataset.durationAlt);

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_edit',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      center: cyclingWaypoints[Math.round(cyclingWaypoints.length / 2.0)],
      zoom: 12
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'marker_edit';

      new mapboxgl.Marker(el)
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(map);
    });

   const departure = { lng: cyclingWaypoints[0][0], lat: cyclingWaypoints[0][1] }
   const arrival = { lng: cyclingWaypoints[cyclingWaypoints.length - 1][0], lat: cyclingWaypoints[cyclingWaypoints.length - 1][1] }


    fitMapToMarkers(map, [departure, arrival]);
    const geolocate = centerToPositionMarker(map);

    // prevent focus on our geocoded location
    geolocate.on('geolocate', function(e) {
      fitMapToMarkers(map, [departure, arrival]);
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

    if (duration) {
        const el = document.createElement('div');
        el.className = 'marker-duration';
        el.innerHTML = `${duration} mins`;
        new mapboxgl.Marker(el)
          .setLngLat([ cyclingWaypoints[Math.round(cyclingWaypoints.length / 2.0)][0], cyclingWaypoints[Math.round(cyclingWaypoints.length / 2.0)][1]])
          .addTo(map);
      };

    if (durationAlt) {
        const ele = document.createElement('div');
        ele.className = 'marker-duration-alt';
        ele.innerHTML = `${durationAlt} mins`;
        new mapboxgl.Marker(ele)
          .setLngLat([ cyclingWaypointsAlt[Math.round(cyclingWaypoints.length / 2.0)][0], cyclingWaypoints[Math.round(cyclingWaypoints.length / 2.0)][1] ])
          .addTo(map);
      };

 }
}

export { initMapboxEdit };
