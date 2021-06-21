<template>
  <h2>날씨를 조회하고 싶은 도시를 입력해보세요.</h2>
  <form @submit.prevent="sendForm">
    <input v-model='city'>
    <button type='submit'>조회하기</button>
  </form>
  <h4 class="result" v-if="searchedCity">{{ this.searchedCity }}의 날씨</h4>
  <li v-for="(value, name) in searchedWeather" v-bind:key="value">{{ name }} : {{ value }}</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WeatherRepository from '../../repositories/WeatherRepository'
import { WeatherObject } from '../../entities/Weather'

export default defineComponent({
  data() {
    return {
      searchedWeather: {} as WeatherObject,
      weatherRepository: new WeatherRepository(),
      city: '',
      searchedCity: '',
    }
  },
  methods: {
    async getWeather() {
      const data = await this.weatherRepository.fetchItem(this.city)
      console.log('data', data)
      this.searchedWeather = data.main;
      this.searchedCity = this.city
    },
    sendForm() {
      this.getWeather()
    }
  },
  mounted() {
    console.log(this.city)
    this.getWeather()
  },
})

</script>

<style>
.result {
  margin-top: 2rem;
}
</style>