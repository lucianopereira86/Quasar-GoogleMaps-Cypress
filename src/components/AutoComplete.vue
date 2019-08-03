<template>
  <div class="q-py-md">
    <div class="row">
      <div class="col-lg-11 col-md-11 col-xs-10 q-pl-md">
        <input
          v-model="vm.searchPlace"
          v-gmaps-searchbox="vm"
          class="full-width q-pa-xs"
          data-cy="txtSearch"
        />
      </div>
      <div class="col-lg-1 col-md-1 col-xs-2 text-center">
        <q-btn
          v-if="directionsService"
          icon="close"
          round
          dense
          @click="clearSearch()"
          data-cy="btnClear"
        ></q-btn>
        <q-btn
          v-if="destination && !directionsService"
          round
          dense
          color="primary"
          @click="getDirections()"
          data-cy="btnDirections"
        >
          <q-icon name="fas fa-route" size="15px"></q-icon>
        </q-btn>
      </div>
    </div>
    <!-- <span>{{getAddress()}}</span> -->
  </div>
</template>

<script>

import Vue from 'vue'
import VueGmaps from 'vue-gmaps'
import { mapAPIKey } from '../../package.json'
Vue.use(VueGmaps, {
  key: mapAPIKey,
  loadGoogleApi: false
})
export default {
  props: {
    map: Object,
    origin: Object,
    setDestination: Function,
    setDistance: Function
  },
  data () {
    return {
      vm: {
        searchPlace: '',
        searchbox: ''
      },
      destination: null,
      directionsService: null,
      directionsDisplay: null
    }
  },
  watch: {
    'vm.place': function () {
      this.getAddress()
    }
  },
  methods: {
    getAddress () {
      this.clearSearch()
      if (this.vm.place) {
        console.log('this.vm.place', this.vm.place)
        this.destination = {
          address: this.vm.place.adr_address,
          icon: this.vm.place.icon,
          lat: this.vm.place.geometry.location.lat(),
          lng: this.vm.place.geometry.location.lng()
        }
        this.setDestination(this.destination)
        return this.vm.place.formatted_address
      } else { return '' }
    },
    getDirections () {
      this.directionsService = new window.google.maps.DirectionsService()
      this.directionsDisplay = new window.google.maps.DirectionsRenderer()
      this.directionsDisplay.setMap(this.map)
      this.directionsDisplay.setOptions({ suppressMarkers: true })
      const self = this
      self.directionsService.route({
        origin: this.origin,
        destination: this.destination,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          console.log('getDirections => response', response)
          self.directionsDisplay.setDirections(response)
          if (response.routes.length > 0) {
            if (response.routes[0].legs.length > 0) {
              let distance = response.routes[0].legs[0].distance.text
              self.setDistance(distance)
            }
          }
        } else {
          console.log('Directions request failed due to ' + status)
        }
      })
    },
    clearSearch () {
      this.vm.searchPlace = ''
      this.destination = null
      if (this.directionsService) this.directionsService = null
      if (this.directionsDisplay) this.directionsDisplay.setMap(null)
      this.setDestination(null)
      this.setDistance('')
    }
  }
}
</script>

<style scoped>
.q-field--filled .q-field__control:before {
  background: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  opacity: 0;
  transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
