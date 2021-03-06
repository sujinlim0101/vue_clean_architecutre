import BaseUseCase from './BaseUseCase';
import BaseRepository from '../repositories/BaseRepository';
import { WeatherEntity } from '../entity/Weather';

export default class SearchWaetherUseCase implements BaseUseCase {
  city: string
  repository: BaseRepository

  constructor (city: string, repository: BaseRepository) {
    this.city = city
    this.repository = repository
  }
  async execute():Promise<WeatherEntity[]>{
    const response = await this.repository.fetchItem(this.city);
    const list = response.list;

    const spreadData = list.map(function(weather: any) {
      const obj = { dt_txt: weather.dt_txt, ...weather.main, ...weather.weather[0] }
      return obj
    })
    return spreadData;
  }
}
