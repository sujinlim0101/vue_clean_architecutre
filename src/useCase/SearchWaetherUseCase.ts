import BaseUseCase from './BaseUseCase';
import BaseRepository from '../repositories/BaseRepository';
import { WeatherEntity } from '../entity/Weather';
export default class SearchForecastUseCase implements BaseUseCase {
  city: string
  repository: BaseRepository

  constructor (city: string, repository: BaseRepository) {
    this.city = city;
    this.repository = repository
  }
  async execute() {
    const weather = await this.repository.fetchItem(this.city);
    return filterWeatherData(weather);
  }
}

const filterWeatherData = (weather: any): WeatherEntity => {
  return { ...weather.main, ...weather.weather[0] }
}
