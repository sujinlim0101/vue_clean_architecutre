export interface IWeather {
  main: WeatherObject
}
export type WeatherObject = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}