<template>
  <h2>Enter city for searching current weather !</h2>
  <form @submit.prevent="sendForm">
    <input v-model='city'>
    <button type='submit'>조회하기</button>
  </form>
  <h4 class="result" v-if="searchedCity">{{ searchedCity }}의 날씨</h4>
  <li v-for="(value, name) in weather" v-bind:key="value">{{ name }} : {{ value }}</li>
  <h4 class="result" v-if="forecast.length > 0">{{ searchedCity }}의 예보</h4>
  <li v-for="weather in forecast" v-bind:key="weather.dt_txt">{{ weather}}</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWaetherUseCase from '../../useCase/SearchWaetherUseCase';
import SearchForecastUseCase from '../../useCase/SearchForecastUseCase';
import { Weather } from '../../entity/Weather';

export default defineComponent({
  data() {
    return {
      weather: {} as Weather,
      forecast: {} as Weather[],
      city: '',
      searchedCity: '',
    }
  },
  methods: {
    async getWeather() {
      this.weather = await new SearchWaetherUseCase(this.city).execute();
      this.searchedCity = this.city;
    },
    async getForecast() {
      this.forecast = await new SearchForecastUseCase(this.city).execute();
    },
    sendForm() {
      this.getWeather();
      this.getForecast();
    }
  }
})

</script>

<style>
.result {
  margin-top: 2rem;
}
</style>
