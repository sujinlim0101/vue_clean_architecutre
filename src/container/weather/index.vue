<template>
  <div>
    <h2>Enter city for searching current weather !</h2>
    <form @submit.prevent="sendForm">
      <input v-model='city'>
      <button type='submit'>조회하기</button>
    </form>
    <div class="weather__container">
      <h4 class="result" v-if="searchedCity">{{ searchedCity }}의 날씨</h4>
      <table>
        <tr>
          <th v-for="(value, name) in weather" v-bind:key="value">{{ titleToKor[name] }}</th>
        </tr>
        <tr>
          <th v-for="value in weather" v-bind:key="value">{{ value }}</th>
        </tr>
      </table>
    </div>
    <div>
      <h4 class="result" v-if="forecast.length > 0">{{ searchedCity }}의 예보</h4>
      <table v-if="forecast.length > 0">
        <tr>
          <th v-for="(value, name) in forecast[0]" v-bind:key="value">{{ titleToKor[name] }}</th>
        </tr>
        <tr v-for="weather in forecast" v-bind:key="weather.dt_txt">
          <td v-for="detail in weather" v-bind:key="detail">{{ detail }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWaetherUseCase from '../../useCase/SearchWaetherUseCase';
import SearchForecastUseCase from '../../useCase/SearchForecastUseCase';
import { Weather } from '../../entity/Weather';

export default defineComponent({
  data() {
    return {
      weather: {} as Weather | {},
      forecast: {} as Weather[] | [],
      city: '',
      searchedCity: '',
      titleToKor: {
        dt_txt: '시간',
        temp: '온도',
        feels_like: '체감온도',
        temp_min: '최저기온',
        temp_max: '최고기온',
        humidity: '습도',
        main: '날씨',
        description: '상세'
      }
    }
  },
  mounted () {
    this.weather = {}
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
table {
  margin: 0 auto;
  border-collapse: collapse;
}
td, th {
  padding: 16px;
  text-align: left;
  border: 1px solid gray;
}
.weather__container {
  max-width: 700px;
  margin: 0 auto;
}

</style>
