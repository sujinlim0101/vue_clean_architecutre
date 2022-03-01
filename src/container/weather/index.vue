<template>
  <div class="container">
    <h2>Enter city for searching weather !</h2>
    <form @submit.prevent="sendForm">
      <label for="city" class="visually-hidden">City</label>
      <div class="input__wrapper">
        <input id="city" class="form-control" type="text" placeholder="ex) seoul" aria-label="input for city" v-model='city'>
      </div>
      <div>
        <button type="submit" class="btn btn-primary mb-3">조회하기</button>
      </div>
    </form>
    <div class="weather__container" v-if="weather">
      <h4 class="result__title" v-if="searchedCity">👒 {{ searchedCity }}'s Today Weather</h4>
      <table>
        <tr>
          <th v-for="(value, name) in weather" v-bind:key="value">{{ weatherTitle[name] }}</th>
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
          <th v-for="(value, name) in forecast[0]" v-bind:key="value">{{ weatherTitle[name] }}</th>
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
import { weatherTitle,  WeatherType } from '../../types/Weather';
import { WeatherRepository, ForecastRepository } from '../../repositories/WeatherRepository';

export default defineComponent({
  data() {
    return {
      weather: {} as WeatherType | {},
      forecast: {} as WeatherType[] | [],
      city: '' as string,
      searchedCity: '' as string,
      weatherTitle
    }
  },
  methods: {
    async getWeather() {
      const weatherResponse = await new SearchWaetherUseCase(this.city, new WeatherRepository()).execute();
      this.weather = { 'temp': weatherResponse.temp, 'feels_like': weatherResponse.feels_like, 'temp_min': weatherResponse.temp_min, 'temp_max': weatherResponse.temp_max,
                       'humidity': weatherResponse.humidity, 'main': weatherResponse.main, 'description': weatherResponse.description };
      this.searchedCity = this.city;
    },
    async getForecast() {
      const forecastResponse = await new SearchForecastUseCase(this.city, new ForecastRepository()).execute();
      this.forecast =  forecastResponse.map(function(item: any) {
        return { dt_txt: item.dt_txt,
          temp: item.temp,
          feels_like: item.feels_like,
          temp_min: item.temp_min,
          temp_max: item.temp_max,
          humidity: item.humidity,
          main: item.main,
          description: item.description }
        }
      )
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
