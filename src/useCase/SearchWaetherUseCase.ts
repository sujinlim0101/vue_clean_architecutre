import BaseUseCase from './BaseUseCase';
import { WeatherRepository } from '../repositories/WeatherRepository';
import BaseRepository from '../repositories/BaseRepository';
const filterWeatherData = (weather: any) => {
  const filteredKeys = [ 'main', 'weather' ]
  const filtered = filteredKeys.reduce((obj, key) => ({ ...obj, [key]: weather[key] }), {});
  return filtered;
}
export default class SearchWaetherUseCase implements BaseUseCase {
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
