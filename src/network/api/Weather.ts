import { AxiosResponse } from 'axios'
import { HTTPMethod } from '@/network/apiClient';
import { WeatherOfAPI } from '@/types/WeatherTypes';
export namespace WeatherAPI {
  export class GetWeather {
    response!: Object;
    path = WeatherOfAPI.weather;
    method = HTTPMethod.GET;
    params = {};
    parse = (data: AxiosResponse) => data.data
    constructor(city: string) {
      this.params = { q: city, appid: process.env.VUE_APP_API_KEY, units: 'metric' };
    }
  }
  export class GetForecast {
    response!: Object;
    path = WeatherOfAPI.forecast;
    method = HTTPMethod.GET;
    params = {};
    parse = (data: AxiosResponse) => data.data
    constructor(city: string) {
      this.params = { q: city, appid: process.env.VUE_APP_API_KEY, units: 'metric' };
    }
  }
}
