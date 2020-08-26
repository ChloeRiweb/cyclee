import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';


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

  const cyclingWaypoints = JSON.parse(mapElement.dataset.cyclingWaypoints);
  const drivingWaypoints = JSON.parse(mapElement.dataset.drivingWaypoints);

  if (mapElement) { // only build a map if there's a div#map to inject into

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
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
      map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                        mapboxgl: mapboxgl }));
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

export { initMapbox };
