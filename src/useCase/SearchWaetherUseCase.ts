import BaseUseCase from './BaseUseCase';
import BaseRepository from '../repositories/BaseRepository';
import { Weather } from '../entity/Weather';
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

const filterWeatherData = (weather: any): Weather => {
  const filteredByKey = { ...weather.main, ...weather.weather[0] }
  return { 'temp': filteredByKey.temp, 'feels_like': filteredByKey.feels_like, 'temp_min': filteredByKey.temp_min, 'temp_max': filteredByKey.temp_max,
           'humidity': filteredByKey.humidity, 'main': filteredByKey.main, 'description': filteredByKey.description };
}
