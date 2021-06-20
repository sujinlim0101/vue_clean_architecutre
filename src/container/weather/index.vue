<template>
  <div>Today's weather in container</div>
  <h2>날씨를 조회하고 싶은 도시를 입력해보세요.</h2>
  <form @submit.prevent="sendForm">
    <input v-model='city'>
    <button type='submit'>조회하기</button>
  </form>
  <div class="result">{{ this.city }} {{ londonCurrentWeather }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WeatherRepository from '../../repositories/WeatherRepository'
import { WeatherObject } from '../../entities/Weather'

export default defineComponent({
  data() {
    return {
      londonCurrentWeather: {} as WeatherObject,
      weatherRepository: new WeatherRepository(),
      city: ''
    }
  },
  methods: {
    async getWeather() {
      const data = await this.weatherRepository.fetchItem(this.city)
      console.log('data', data)
      this.londonCurrentWeather = data.main;
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