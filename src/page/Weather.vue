<template>
  <h3>오늘의 🇰🇷  서울 날씨</h3>
  <li v-for="(value, name) in seoulCurrentWeather" v-bind:key="value">{{ name }} : {{ value }}</li>
  <WeatherContainer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios';
import WeatherContainer from '../container/weather/index.vue'

export default defineComponent({
  components: {
    WeatherContainer
  },
  data() {
    return {
      seoulCurrentWeather: Object
    }
  },
  mounted() {
    axios.get('http://api.openweathermap.org/data/2.5/weather?lat=37.56826&lon=126.977829&APPID=' + process.env.VUE_APP_API_KEY + '&units=metric ')
      .then(response => {
        console.log('response', response);
        this.seoulCurrentWeather = response.data.main;
      })
  },
})

</script>

<style>

</style>