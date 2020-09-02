import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { fitMapToMarkers } from './init_mapbox';

// const getCurrentPosition = () => {
//   return new Promise(function(resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

const addMarker = async (map) => {
  const position = await getCurrentPosition();
  map.flyTo({
    center: [position.coords.longitude, position.coords.latitude]
  });
}

const initMapboxParkings = () => {

  const mapElement = document.getElementById('map_parkings');

  if (mapElement) { // only build a map if there's a div#map to inject into

    const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
    const parkings = JSON.parse(mapElement.dataset.parkings);

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_parkings',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      zoom: 20
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'marker_flag_parkings';

      new mapboxgl.Marker(el)
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(map);
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

// Add parking markers to the map
    if (parkings) {
      parkings.forEach((parking) => {
        const el = document.createElement('div');
        el.className = "marker_parking";
        new mapboxgl.Marker(el)
          .setLngLat([ parking.lng, parking.lat ])
          .addTo(map);
      });
      fitMapToMarkers(map, parkings);
      map.setZoom(17);
    }
  }
 }



// const initMapboxParkings  = () => {

//   const mapElement = document.getElementById('map_parkings');

//   const addMarkersParkings = (mapElement, map) => {
//     const parkings = JSON.parse(mapElement.dataset.parkings);
//     if (parkings) {
//       parkings.forEach((parking) => {
//         const elt = document.createElement('div');
//         elt.className = "marker_parking";

//         new mapboxgl.Marker(elt)
//           .setLngLat([
//             parking.lng,
//             parking.lat ])
//           .addTo(map);
//       });
//       fitMapToMarkers(map, parkings);
//     }
//   }

//   if (mapElement) { // only build a map if there's a div#map to inject into

//     const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);

//     mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
//     const map = new mapboxgl.Map({
//       container: 'map_parkings',
//       style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
//       center: [2.379717, 48.865433],
//       zoom: 12
//     });

//       map.addSource('cycling', {
//         type: 'geojson',
//         data: {
//           type: 'Feature',
//           properties: {},
//           geometry: {
//             type: 'LineString',
//             coordinates: cyclingWaypoints
//           }
//         }
//       });

//       map.addLayer({
//         id: 'cycling',
//         type: 'line',
//         source: 'cycling',
//         layout: {
//           'line-join': 'round',
//           'line-cap': 'round'
//         },
//         paint: {
//           'line-color': '#ef596e',
//           'line-width': 4
//         }
//       });

//     addMarkersParkings(mapElement, map);
//   }
// };


export { initMapboxParkings };
