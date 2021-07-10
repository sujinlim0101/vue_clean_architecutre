<template>
  <h2>Enter city for searching current weather !</h2>
  <form @submit.prevent="sendForm">
    <input v-model='city'>
    <button type='submit'>조회하기</button>
  </form>
  <h4 class="result" v-if="searchedCity">{{ this.searchedCity }}의 날씨</h4>
  <li v-for="(value, name) in weather" v-bind:key="value">{{ name }} : {{ value }}</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WeatherRepository, ForecastRepository } from '../../repositories/WeatherRepository'
import BaseRepository from '../../repositories/BaseRepository'
import SearchWaetherUseCase from '../../useCase/SearchWaetherUseCase';
import { Weather } from '../../entity/Weather';

export default defineComponent({
  data() {
    return {
      weather: {} as Weather,
      weatherRepository: new WeatherRepository() as BaseRepository,
      forecast: {},
      forecastRepository: new ForecastRepository() as BaseRepository,
      city: '',
      searchedCity: '',
    }
  },
  methods: {
    async getWeather() {
      const data = await new SearchWaetherUseCase(this.city).execute();
      console.log('data', data)
      this.weather = data
      this.searchedCity = this.city
    },
    async getForecast() {
      const data = await this.forecastRepository.fetchItem(this.city)
      console.log('forecast', data);
      this.forecast = data;
    },
    sendForm() {
      this.getWeather()
      this.getForecast()
    }
  }
})

</script>

<style>
.result {
  margin-top: 2rem;
}
</style>
