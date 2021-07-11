import BaseUseCase from './BaseUseCase';
import { WeatherRepository } from '../repositories/WeatherRepository';
import BaseRepository from '../repositories/BaseRepository';
import { Weather } from '../entity/Weather';
export default class SearchForecastUseCase implements BaseUseCase {
  city: string
  constructor (city: string) {
    this.city = city
  }
  private weatherRepository: BaseRepository =  new WeatherRepository();
  async execute() {
    const weather = await this.weatherRepository.fetchItem(this.city);
    return filterWeatherData(weather);
  }
}

const filterWeatherData = (weather: any): Weather => {
  const filteredByKey = { ...weather.main, ...weather.weather[0] }
  return { 'temp': filteredByKey.temp, 'feels_like': filteredByKey.feels_like, 'temp_min': filteredByKey.temp_min, 'temp_max': filteredByKey.temp_max,
           'humidity': filteredByKey.humidity, main: filteredByKey.main, description: filteredByKey.description };
}
