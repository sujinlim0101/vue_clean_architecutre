import BaseUseCase from './BaseUseCase';
import { WeatherRepository } from '../repositories/WeatherRepository';
import BaseRepository from '../repositories/BaseRepository';
import { Weather } from '../entity/Weather';
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

const filterWeatherData = (weather: any) => {
  const filteredByKey = { ...weather.main, ...weather.weather[0] }
  const expectedKeys: (keyof Weather)[] = [ 'temp', 'feels_like','temp_min', 'temp_max', 'humidity', 'main', 'description'];
  return expectedKeys.reduce((obj, key) => ({ ...obj, [key]: filteredByKey[key] }), {});
}
