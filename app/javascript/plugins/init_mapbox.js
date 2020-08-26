import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
};


const addMarker = async (map) => {
  // console.log(map)
  const position = await getCurrentPosition();
  fillRideForm(position.coords.longitude, position.coords.latitude)

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
      markers.forEach((marker) => {
        new mapboxgl.Marker()
          .setLngLat([ marker.lng, marker.lat ])
          .addTo(map);
      });
      fitMapToMarkers(map, markers);
      map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                        mapboxgl: mapboxgl }));
    }

    addMarker(map)

    map.on('load', () => {
      const positionBtn = document.querySelector('.mapboxgl-ctrl-icon')
      if (positionBtn) {
        positionBtn.click();
      }
    })
  }
};

// je récupère la current position du navigateur :
// 1/ fonction de rappel qui prend un objet Position comme argument.
// const success = (position) => {
//   console.log(position)
  // const coords = position.coords;
  //   console.log(coords)
  //   console.log('Votre position actuelle est :');
  //   console.log(`Latitude : ${coords.latitude}`);
  //   console.log(`Longitude : ${coords.longitude}`);
  // const lat = document.getElementById('ride_origin_latitude');
  // const long = document.getElementById('ride_origin_longitude');
  //   console.log(lat);
  //   console.log(long);
  // lat.value = coords.latitude;
  // long.value = coords.longitude;
  // const markers = [{coords.longitude, coords.latitude}];
  // console.log(markers);
  // if (markers) {
  //   markers.forEach((marker) => {
  //     console.log(marker)
  //     new mapboxgl.Marker()
  //       .setLngLat([ marker.lng, marker.lat ])
  //       .addTo(map);
  //   });
  //   fitMapToMarkers(map, markers);
  //   map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
  //                                     mapboxgl: mapboxgl }));
  // };
  // const marker = new mapboxgl.Marker()
  //   .setLngLat([coords.longitude, coords.latitude])
  //   .addTo(map);
  //   console.log(marker);
// }



// 2/ j'appelle la méthode getCurrentPosition
// const getCurrentPosition = () => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     return position
//   });
// };


const fillRideForm = (long, lat) => {
  const latInput = document.getElementById('ride_origin_latitude');
  const longInput = document.getElementById('ride_origin_longitude');
  if (latInput) {
    latInput.value = lat;
    longInput.value = long;
  }
}

const getCurrentPosition = () => {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// 3/ j'insère les coordonnées dans les champs origin_lat & origin_long

// 4/ ajouter le marqueur

//

export { initMapbox, getCurrentPosition };
