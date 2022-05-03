import BaseRepository from '@/repositories/BaseRepository'
import { APIClient } from '@/network/apiClient'
import { WeatherAPI } from '@/network/api/Weather'
export class WeatherRepository implements BaseRepository {
  async fetchItem(city: string): Promise<object> {
    return await APIClient.shared.request(new WeatherAPI.GetWeather(city))
  }
}
export class ForecastRepository implements BaseRepository {
  async fetchItem(city: string): Promise<object> {
    return await APIClient.shared.request(new WeatherAPI.GetForecast(city))
  }
}
