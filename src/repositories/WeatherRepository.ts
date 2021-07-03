import BaseRepository from '@/repositories/BaseRepository'
import { APIClient } from '@/network/apiClient'
import { WeatherAPI } from '@/network/api/Weather'

export default class WeatherRepository implements BaseRepository {
  constructor() {

  }
    return await APIClient.shared.request(new WeatherAPI.GetWeather(city))
  }
}