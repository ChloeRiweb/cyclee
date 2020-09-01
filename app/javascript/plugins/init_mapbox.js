import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
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
  geolocate.on('geolocate', function(e) {
    map.flyTo({
      zoom: 15,
      center: [e.coords.longitude, e.coords.latitude]
    });
  });
}

const fillRideForm = (lat, lng) => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latInput = document.getElementById('ride_origin_latitude');
    const longInput = document.getElementById('ride_origin_longitude');
    if (latInput) {
      latInput.value = position.coords.latitude;
      longInput.value = position.coords.longitude;
    }
  });
}

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      center: [2.379717, 48.865433],
      zoom: 12
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    if (markers) {
      fillRideForm();
      // Add markers (destination)
      markers.forEach((marker) => {
        new mapboxgl.Marker()
          .setLngLat([ marker.lng, marker.lat ])
          .addTo(map);
      });
      fitMapToMarkers(map, markers);
    } else {
      // Add user current location
      centerToPositionMarker(map)
    }
  }
};



export { initMapbox, fitMapToMarkers };
