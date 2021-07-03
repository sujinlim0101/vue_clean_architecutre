import { AxiosResponse } from 'axios'
import { APIRequest } from '@/network/APIRequest';
import { HTTPMethod } from '@/network/apiClient';
export namespace WeatherAPI {
  export class GetWeather implements APIRequest<IWeather> {
    path = '/weather';
    path = WeatherOfAPI.weather;
    method = HTTPMethod.GET;
    parse = (data: AxiosResponse) => data.data
    // TODO: move city to
    constructor(city: string) {
      this.path = `/weather?q=${city}&appid=${process.env.VUE_APP_API_KEY}&units=metric`;
    }
  }
}