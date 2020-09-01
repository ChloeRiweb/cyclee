import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { fitMapToMarkers } from './init_mapbox';

const initMapboxHotspots  = () => {

  const mapElement = document.getElementById('map_hotspots');

  const addMarkersHotspots = (mapElement, map) => {
    const hotspots = JSON.parse(mapElement.dataset.hotspots);
    if (hotspots) {
      hotspots.forEach((hotspot) => {
        const el = document.createElement('div');

        el.className = `marker_${hotspot.category}`;
        new mapboxgl.Marker(el)
          .setLngLat([
            hotspot.lng,
            hotspot.lat ])
          .addTo(map);
      });
      fitMapToMarkers(map, hotspots);
    }
  }

  if (mapElement) { // only build a map if there's a div#map to inject into

    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map_hotspots',
      style: 'mapbox://styles/chloeri/ckecwoto80ikm19p5q5qk4yf9',
      center: [2.379717, 48.865433],
      zoom: 12
    });

    addMarkersHotspots(mapElement, map);
  }
};


export { initMapboxHotspots };
