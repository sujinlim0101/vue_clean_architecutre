<template>
  <div class="container">
    <h2>Enter city for searching weather !</h2>
    <form @submit.prevent="sendForm">
      <label for="city" class="visually-hidden">City</label>
      <div class="input__wrapper">
        <input id="city" class="form-control" type="text" placeholder="Enter City" aria-label="input for city" v-model='city'>
      </div>
      <div>
        <button type="submit" class="btn btn-primary mb-3">조회하기</button>
      </div>
    </form>
    <div class="weather__container" v-if="weather">
      <h4 class="result__title" v-if="searchedCity">👒 {{ searchedCity }}'s Today Weather</h4>
      <table>
        <tr>
          <th v-for="(value, name) in weather" v-bind:key="value">{{ titleToKor[name] }}</th>
        </tr>
        <tr>
          <th v-for="value in weather" v-bind:key="value">{{ value }}</th>
        </tr>
      </table>
    </div>
    <div class="weather__container" v-if="forecast.length > 0">
      <h4 class="result__title">🧢 {{ searchedCity }}'s Forecast</h4>
      <table>
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
  methods: {
    async getWeather() {
      this.weather = await new SearchWaetherUseCase(this.city, new WeatherRepository()).execute();
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

<style lang="scss">
.container {
  padding: 1rem;
}
.result__title {
  margin: 1.2rem;
  font-size: 2.2rem;
  font-weight: 600;
}
table {
  margin: 0 auto;
  border-collapse: collapse;
}
form {
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin: 0 auto;
}
.input__wrapper {
  flex-grow: 1;
  padding-right: 1rem;
}
td, th {
  padding: 1rem;
  text-align: left;
  border: 1px solid #326a64 !important;
  border-width: 1px !important;
}
.weather__container {
  max-width: 700px;
  margin: 0 auto;
}

</style>
