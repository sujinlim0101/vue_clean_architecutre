<template>
  <div>Today's weather in container</div>
  <div>🇬🇧 London: {{ londonCurrentWeather }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WeatherRepository from '../../repositories/WeatherRepository'
import { WeatherObject } from '../../entities/Weather'

export default defineComponent({
  data() {
    return {
      londonCurrentWeather: {} as WeatherObject,
      weatherRepository: new WeatherRepository()
    }
  },
  methods: {
    async getWeather() {
      const data = await this.weatherRepository.fetchItem('London')
      console.log('data', data);
      this.londonCurrentWeather = data.main;
  }
  },
  mounted() {
    this.getWeather()
  },
})

</script>

<style>

</style>