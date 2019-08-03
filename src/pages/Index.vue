<template>
  <q-page>
    <AutoComplete
      class="full-width"
      v-if="map"
      :map="map"
      :origin="myPosition"
      :setDestination="setDestination"
      :setDistance="setDistance"
    />
    <GmapMap
      ref="mapRef"
      :center="myPosition"
      :zoom="18"
      :options="{disableDefaultUI:true}"
      map-type-id="roadmap"
      style="width: 100%; height:80vh"
    >
      <gmap-info-window
        v-if="info.position"
        @closeclick="info.isOpen=false"
        :opened="info.isOpen"
        :position="info.position"
        :options="{
          pixelOffset: {
            width: 0,
            height: -35
          }
        }"
      >
        <div v-if="info.position.address">
          <q-card class="my-card relative-position">
            <q-card-section>
              <span v-html="info.position.address"></span>
            </q-card-section>
          </q-card>
        </div>
        <div v-else>
          <span>My Position</span>
        </div>
      </gmap-info-window>

      <GmapMarker ref="myMarker" :position="myPosition" @click="openInfoWindow()" />
      <GmapMarker
        v-if="destination"
        ref="destMarker"
        :position="destination"
        :icon="{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }"
        @click="openInfoWindow(true)"
      />
    </GmapMap>
    <q-page-sticky position="top-right" :offset="[18, 80]">
      <q-btn round color="positive" @click="centerCamera(myPosition)" data-cy="btnCamera">
        <q-icon name="my_location" size="1.8em"></q-icon>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="top-right" :offset="[18, 150]">
      <q-btn round color="negative" @click="addRemoveCircle()" data-cy="btnCircle">
        <q-icon :name="circle? 'remove_circle_outline' : 'add_circle_outline'" size="1.8em"></q-icon>
      </q-btn>
    </q-page-sticky>
    <DialogCircle ref="DialogCircle" />
    <div class="absolute-bottom text-center q-ma-md bg-white" v-if="distance">
      <span class="text-h6">Distance: {{distance}}</span>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'
import { mapAPIKey } from '../../package.json'
import * as VueGoogleMaps from 'vue2-google-maps'
import DialogCircle from '../components/DialogCircle'

import AutoComplete from '../components/AutoComplete'

Vue.use(VueGoogleMaps, {
  load: {
    key: mapAPIKey,
    libraries: ['places', 'directions']
  }
})

export default {
  page: 'PageIndex',
  components: {
    DialogCircle,
    AutoComplete
  },
  data () {
    return {
      self: this,
      map: null,
      myPosition: { lat: 0, lng: 0 },
      destination: null,
      loading: false,
      info: {
        isOpen: false
      },
      circle: null,
      distance: ''
    }
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map = map

      this.getPosition(() => {
        const self = this
        setInterval(function () {
          self.getPosition()
        }, 10000)
      }, () => {
        this.$q.loading.hide()
      })
    })
  },
  methods: {
    openInfoWindow (isDestination) {
      if (isDestination) {
        this.info = {
          position: this.destination,
          isOpen: true
        }
      } else {
        this.info = {
          position: this.myPosition,
          isOpen: true
        }
      }
    },
    centerCamera (position, isDestination) {
      console.log('this.$refs.mapRef', this.$refs.mapRef)
      this.$refs.mapRef.panTo(position)
      this.openInfoWindow(isDestination)
    },
    addRemoveCircle () {
      if (this.circle) {
        this.circle.setMap(null)
        this.circle = null
      } else {
        let callback = (hex, radius, opacity) => {
          this.circle = new window.google.maps.Circle({
            center: this.myPosition,
            radius: radius,
            fillColor: hex,
            fillOpacity: opacity,
            map: this.map,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.1,
            strokeWeight: 2
          })
        }
        this.$refs.DialogCircle.open(callback)
      }
    },
    getPosition (callback, error) {
      const self = this
      navigator.geolocation.getCurrentPosition(
        function (position) {
          if (parseFloat(parseFloat(position.coords.latitude).toFixed(4)) !==
            parseFloat(parseFloat(self.myPosition.lat).toFixed(4)) &&
            parseFloat(parseFloat(position.coords.longitude).toFixed(4)) !==
            parseFloat(parseFloat(self.myPosition.lng).toFixed(4))) {
            console.log('position', position)
            self.myPosition.lat = position.coords.latitude
            self.myPosition.lng = position.coords.longitude
            console.log('this.myPosition', self.myPosition)

            if (callback) { callback() }
          }
        },
        function (err) {
          console.error('navigator.geolocation.getCurrentPosition', err)
          if (error) { error() }
        }, {
          enableHighAccuracy: true,
          timeout: 5000
        }
      )
    },
    updateCoordinates (location) {
      this.myPosition = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      }
      this.info.position = this.myPosition
      this.centerCamera(this.myPosition)
    },
    setDestination (destination) {
      console.log('setDestination => destination', destination)
      this.destination = destination
      if (destination) {
        this.centerCamera(destination, true)
      } else { this.info.isOpen = false }
    },
    setDistance (distance) {
      this.distance = distance
    }
  }
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
