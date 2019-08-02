<template>
  <q-page>
    <GmapMap
      ref="mapRef"
      :center="myPosition"
      :zoom="18"
      :options="{disableDefaultUI:true}"
      map-type-id="roadmap"
      style="width: 100%; height:90vh"
    >
      <gmap-info-window
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
        <!-- <div v-if="info.shop">
          <q-item @click.native="showProducts()">
            <q-item-side :avatar="info.shop.imgurl" />
            <q-item-main>
              {{info.shop.description}}
              <div class="q-mt-sm">
                <q-icon name="star" color="yellow" v-for="n in 5" :key="n" />
              </div>
            </q-item-main>
          </q-item>
        </div>
        <div v-else-if="info.spot_id">
          <q-item @click.native="share(info)">
            <q-item-main>
              <span v-if="info.isMine">MEU SPOT</span>
              <span v-else>OUTRO SPOT</span>
              <div class="q-mt-sm">
                <q-icon name="redeem" color="negative" />
                x {{info.gifts.length}}
              </div>
            </q-item-main>
          </q-item>
        </div>-->
        <div>
          <span>My Position</span>
        </div>
      </gmap-info-window>

      <GmapMarker
        ref="myMarker"
        :position="myPosition"
        :draggable="true"
        @drag="updateCoordinates"
        @click="openInfoWindow()"
      />
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :icon="m.icon"
        :position="m.position"
        :clickable="true"
        @click="openInfoWindow(m)"
      />-->
    </GmapMap>
    <!-- <q-page-sticky position="top-left" :offset="[18, 18]">
      <q-btn round color="dark" @click="exit()">
        <q-icon name="exit_to_app" size="1.8em"></q-icon>
      </q-btn>
    </q-page-sticky>-->
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn round color="primary" @click="centerCamera()">
        <q-icon name="my_location" size="1.8em"></q-icon>
      </q-btn>
    </q-page-sticky>
    <!-- <q-page-sticky position="top-right" :offset="[18, 100]" v-if="isInsideSpot()">
      <q-btn round color="white" @click="share(currentSpot)">
        <q-icon name="card_giftcard" color="negative" size="1.8em"></q-icon>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom" :offset="[0,50]" v-if="!isInsideSpot()">
      <q-btn round color="secondary" @click="share()" size="1.2em">
        <q-icon name="share" size="1.8em"></q-icon>
      </q-btn>
    </q-page-sticky>-->
  </q-page>
</template>

<style>
</style>

<script>
import { mapAPIKey } from '../../package.json'
import * as VueGoogleMaps from 'vue2-google-maps'

import Vue from 'vue'
Vue.use(VueGoogleMaps, {
  load: {
    key: mapAPIKey,
    libraries: ['places', 'geometry']
  }
})
// let radius = 50

export default {
  page: 'PageIndex',
  data () {
    return {
      self: this,
      map: null,
      myPosition: { lat: 0, lng: 0 },
      markers: [],
      loading: false,
      info: {
        isOpen: false
      }
    }
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map = map

      this.getPosition(() => {

        //   // const self = this
        //   // setInterval(function () {
        //   //   self.getPosition();
        //   // }.bind(this), 10000);

      }, () => {
        this.$q.loading.hide()
      })
    })
  },
  methods: {
    // getShops () {
    //   this.$axios.get('/v1/shops')
    //     .then((response) => {
    //       let shops = response.data
    //       console.log('/v1/shops', shops)
    //       shops.forEach(s => {
    //         this.markers.push({
    //           icon: 'statics/icons/icon-shop.png',
    //           shop: s,
    //           position: {
    //             lat: s.latitude,
    //             lng: s.longitude
    //           }
    //         })
    //       })
    //       this.$q.loading.hide()

    //       this.getSpots()
    //     })
    //     .catch((error) => Erro.getError(error, () => {
    //       this.$q.loading.hide()
    //     }))
    // },
    // getSpots () {
    //   if (this.spots.length > 0) {
    //     this.spots.forEach(spot => {
    //       spot.setMap(null)
    //     })
    //     this.spots = []
    //   }
    //   this.$q.loading.show({ message: 'Procurando Spots...' })
    //   this.$axios.get('/v1/spots')
    //     .then((response) => {
    //       let spots = response.data
    //       console.log('/v1/spots', spots)
    //       spots.forEach(s => {
    //         console.log('/v1/spots => s', s)
    //         let spot = {
    //           spot_id: s._id,
    //           isMine: s.user_id == this.user_id,
    //           position: {
    //             lat: s.latitude,
    //             lng: s.longitude
    //           },
    //           gifts: s.gifts
    //         }

    //         this.addSpot(spot)
    //       })
    //       this.$q.loading.hide()
    //       Aviso.show(spots.length + ' spot(s) ao redor')
    //     })
    //     .catch((error) => Erro.getError(error, () => {
    //       this.$q.loading.hide()
    //     }))
    // },
    openInfoWindow () { // marker) {
      // if (marker) {
      //   this.info = {
      //     position: marker.position,
      //     isOpen: true,
      //     shop: marker.shop,
      //     spot_id: marker.spot_id,
      //     isMine: marker.isMine,
      //     gifts: marker.gifts
      //   }
      // } else {
      this.info = {
        position: this.myPosition,
        isOpen: true
      }
      // }
    },
    centerCamera () {
      console.log('this.$refs.mapRef', this.$refs.mapRef)
      this.$refs.mapRef.panTo(this.myPosition)
      this.openInfoWindow()
    },
    // showProducts () {
    //   this.$q.loading.show()
    //   this.$axios.get('/v1/products', { params: { shop_id: this.info.shop._id } })
    //     .then((response) => {
    //       this.$q.loading.hide()
    //       let products = response.data
    //       console.log('/v1/products => products', products)
    //       if (products.length === 0) {
    //         Aviso.show('A loja não tem produtos')
    //         return
    //       }
    //       console.log('this.$refs', this.$refs)
    //       this.$refs.modalProducts.open(this.info.shop, products)
    //     })
    //     .catch((error) => Erro.getError(error, () => {
    //       this.$q.loading.hide()
    //     }))
    // },
    // share (info) {
    //   const self = this
    //   self.$refs.modalShare.open(info)
    // },
    // addSpot (spot) {
    //   console.log('spot', spot)

    //   let fillColor = spot.isMine ? '#0000FF' : '#FF0000'
    //   var circle = new google.maps.Circle({
    //     center: spot.position,
    //     radius: radius,
    //     fillColor: fillColor,
    //     fillOpacity: 0.1,
    //     map: this.map,
    //     strokeColor: '#FFFFFF',
    //     strokeOpacity: 0.1,
    //     strokeWeight: 2,
    //     // DADOS DO SPOT
    //     spot_id: spot.spot_id,
    //     isMine: spot.isMine,
    //     position: spot.position,
    //     gifts: spot.gifts
    //   })

    //   this.spots.push(circle)
    // },
    // isInsideSpot () {
    //   let isInside = false
    //   this.spots.forEach(spot => {
    //     console.log('this.myPosition', this.myPosition)
    //     console.log('spot.position', spot.position)

    //     let pointA = new google.maps.LatLng(this.myPosition.lat, this.myPosition.lng)
    //     let pointB = new google.maps.LatLng(spot.position.lat, spot.position.lng)
    //     console.log('pointA', pointA)
    //     console.log('pointB', pointB)

    //     var distanceInMetres = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB)
    //     console.log('distanceInMetres', distanceInMetres)
    //     isInside = distanceInMetres <= radius
    //     console.log('isInside', isInside)
    //     if (isInside) {
    //       this.currentSpot = spot
    //       console.log('currentSpot', spot)
    //     }
    //   })
    //   return isInside
    // },
    getPosition (callback, error) {
      const self = this
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log('position', position)
          self.myPosition.lat = position.coords.latitude
          self.myPosition.lng = position.coords.longitude
          console.log('this.myPosition', self.myPosition)

          if (callback) { callback() }
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
      this.centerCamera()
    }
  }
}
</script>
