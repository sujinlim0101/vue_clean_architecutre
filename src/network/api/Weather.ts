import { AxiosResponse } from 'axios'
import { HTTPMethod } from '@/network/apiClient';
import { WeatherPath } from '@/types/WeatherPath';
export namespace WeatherAPI {
  export class GetWeather {
    response!: object;
    path = WeatherPath.weather;
    method = HTTPMethod.GET;
    params = {};
    parse = (data: AxiosResponse) => data.data
    constructor(city: string) {
      this.params = { q: city, appid: process.env.VUE_APP_API_KEY, units: 'metric' };
    }
  }
  export class GetForecast {
    response!: object;
    path = WeatherPath.forecast;
    method = HTTPMethod.GET;
    params = {};
    parse = (data: AxiosResponse) => data.data
    constructor(city: string) {
      this.params = { q: city, appid: process.env.VUE_APP_API_KEY, units: 'metric' };
    }
  }
}
