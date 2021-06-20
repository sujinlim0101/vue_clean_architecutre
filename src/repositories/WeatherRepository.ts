import BaseRepository from '@/repositories/BaseRepository'
import { APIClient } from '@/network/apiClient'
import { WeatherAPI } from '@/network/api/Weather'
import { IWeather } from '@/entities/Weather'

export default class WeatherRepository implements BaseRepository {
  constructor() {

  }
  async fetchItem(city: string): Promise<IWeather> {
    return await APIClient.shared.request(new WeatherAPI.GetWeather(city))
  }
}