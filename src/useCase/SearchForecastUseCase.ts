import BaseUseCase from './BaseUseCase';
import BaseRepository from '../repositories/BaseRepository';
import { Weather } from '../entity/Weather';

export default class SearchWaetherUseCase implements BaseUseCase {
  city: string
  repository: BaseRepository

  constructor (city: string, repository: BaseRepository) {
    this.city = city
    this.repository = repository
  }
  async execute():Promise<Weather[]>{
    const response = await this.repository.fetchItem(this.city);
    const list = response.list;

    const spreadData = list.map(function(weather: any) {
      const obj = { dt_txt: weather.dt_txt, ...weather.main, ...weather.weather[0] }
      return obj
    })
    const filteredWeather: Weather[] = spreadData.map(function(item: any) {
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

    return filteredWeather;
  }
}
