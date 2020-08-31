import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { fitMapToMarkers } from './init_mapbox';

const initMapboxParkings  = () => {

  const mapElement = document.getElementById('map_parkings');

  const addMarkersParkings = (mapElement, map) => {
    const parkingSpots = JSON.parse(mapElement.dataset.parkingSpots);
    if (parkingSpots) {
      parkingSpots.forEach((parkingSpot) => {
        new mapboxgl.Marker()
          .setLngLat([
            parkingSpot.lng,
            parkingSpot.lat ])
          .addTo(map);
      });
      fitMapToMarkers(map, parkingSpots);
    }
  }

  if (mapElement) { // only build a map if there's a div#map to inject into

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_parkings',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      center: [2.379717, 48.865433],
      zoom: 12
    });

    // const markers = JSON.parse(mapElement.dataset.markers);


    // if (markers) {
    //   fillRideForm();
    //   // Add markers (destination)
    //   markers.forEach((marker) => {
    //     new mapboxgl.Marker()
    //       .setLngLat([ marker.lng, marker.lat ])
    //       .addTo(map);
    //   });
    //   fitMapToMarkers(map, markers);
    // } else {
    //   // Add user current location
    //   addMarker(map)

    //   map.on('load', () => {
    //     const positionBtn = document.querySelector('.mapboxgl-ctrl-icon')
    //     if (positionBtn) {
    //       positionBtn.click();
    //     }
    //   })
    // }
    addMarkersParkings(mapElement, map);
  }
};


export { initMapboxParkings };
