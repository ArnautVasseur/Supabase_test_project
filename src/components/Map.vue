<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'Map',
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Initialize the map
      this.map = L.map('map').setView([51.505, -0.09], 13);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Add a marker
      L.marker([51.5, -0.09]).addTo(this.map)
        .bindPopup('A sample marker.');
    },
  },
};
</script>

<style scoped>
#map {
  height: 600px;
}
</style>
