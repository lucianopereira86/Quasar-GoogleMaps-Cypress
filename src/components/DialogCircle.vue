<template>
  <q-dialog v-model="show">
    <div class="bg-white">
      <q-color v-model="hex" no-header class="my-picker" />
      <div class="q-ma-md">
        <span class="text-primary">Radius: {{ radius }} (10 to 100)</span>
        <q-slider v-model="radius" :min="10" :max="100" :step="10" data-cy="sliRadius" />
      </div>
      <div class="q-ma-md">
        <span class="text-primary">Opacity: {{ opacity }} (0.1 to 1)</span>
        <q-slider v-model="opacity" :min="0.1" :max="1" :step="0.1" data-cy="sliOpacity" />
      </div>
      <div class="row">
        <div class="col">
          <q-btn class="full-width" v-close-popup>Cancel</q-btn>
        </div>
        <div class="col">
          <q-btn color="positive" class="full-width" @click="confirm()" data-cy="btnConfirm">Confirm</q-btn>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      hex: '#FF00FF',
      radius: 10,
      opacity: 0.1,
      callback: null
    }
  },
  methods: {
    open (callback) {
      this.show = true
      this.callback = callback
    },
    confirm () {
      this.callback(this.hex, this.radius, this.opacity)
      this.show = false
    }
  }
}
</script>

<style scoped>
.my-picker {
  width: 250px;
}
</style>
