<template>
  <div>Today's weather</div>
  <div>🇰🇷 Seoul: {{ seoulCurrentWeather }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      seoulCurrentWeather: Object
    }
  },
  mounted() {
    axios.get('http://api.openweathermap.org/data/2.5/weather?lat=37.56826&lon=126.977829&APPID=' + process.env.VUE_APP_API_KEY)
      .then(response => {
        console.log('response', response);
        this.seoulCurrentWeather = response.data.main;
      })
  },
})

</script>

<style>

</style>