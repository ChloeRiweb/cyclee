import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';


// To use in show page
// only around the destination point (radius 30m)
const addMarkersParkings = (mapElement, map) => {
  const parkings = JSON.parse(mapElement.dataset.parkings);
  if (parkings) {
    parkings.forEach((parking) => {
      new mapboxgl.Marker()
        .setLngLat([
          parking.lng,
          parking.lat ])
        .addTo(map);
    })
  }
}

const addMarkersPumps = (mapElement, map) => {
  const pumps = JSON.parse(mapElement.dataset.pumps);
  console.log(pumps);
  if (pumps) {
    pumps.forEach((pump) => {
      new mapboxgl.Marker()
        .setLngLat([
          pump.lng,
          pump.lat ])
        .addTo(map);
    })
  }
}

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
          'line-color': '#183B60',
          'line-width': 4
        }
      });
    });

    addMarkersParkings(mapElement, map);
    addMarkersPumps(mapElement, map);
 }
}

export { initMapboxShow };
