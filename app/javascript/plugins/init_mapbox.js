import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
};


const addMarker = async (map) => {
  const position = await getCurrentPosition();
  map.flyTo({
    center: [position.coords.longitude, position.coords.latitude]
  });

  map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
      trackUserLocation: true
    })
  );
}

const initMapbox = () => {

  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 10
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
      // map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      //                                   mapboxgl: mapboxgl }));
    } else {
      // Add user current location
      addMarker(map)

      map.on('load', () => {
        const positionBtn = document.querySelector('.mapboxgl-ctrl-icon')
        if (positionBtn) {
          positionBtn.click();
        }
      })
    }

  }
};

const fillRideForm = async () => {
  const position = await getCurrentPosition();
  const latInput = document.getElementById('ride_origin_latitude');
  const longInput = document.getElementById('ride_origin_longitude');
  if (latInput) {
    latInput.value = position.coords.latitude;
    longInput.value = position.coords.longitude;
  }
}

const getCurrentPosition = () => {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export { initMapbox };
