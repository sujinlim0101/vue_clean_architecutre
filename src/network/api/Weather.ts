import { AxiosResponse } from 'axios'
import { APIRequest } from '@/network/APIRequest';
import { HTTPMethod } from '@/network/apiClient';
import { IWeather } from '@/entities/Weather';
export namespace WeatherAPI {
  export class GetWeather implements APIRequest<IWeather> {
    response!: IWeather;
    path = '/weather';
    method = HTTPMethod.GET;
    parse = (data: AxiosResponse) => data.data
    // TODO: move city to
    constructor(city: string) {
      this.path = `/weather?q=${city}&appid=${process.env.VUE_APP_API_KEY}`;
    }
  }
}