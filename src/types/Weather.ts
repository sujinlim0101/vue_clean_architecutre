import { WeatherEntity } from './../entity/Weather';
interface WeatherInfo {
  title: string;
}
export type WeatherType = {
  dt_txt?: string,
  temp: number,
  feels_like : number,
  temp_min : number,
  temp_max : number,
  humidity : number,
  main : string,
  description : string,
}

export const weatherTitle: Record<keyof WeatherType, WeatherInfo> = {
  dt_txt: { title: '시간' },
  temp: { title: '온도' },
  feels_like :{ title: '체감온도' },
  temp_min : { title: '최저기온'},
  temp_max : { title: '최고기온' },
  humidity : { title: '습도' },
  main : { title: '날씨' },
  description : { title: '상세' },
}

export enum WeatherPath {
  weather = 'weather',
  forecast = 'forecast',
}
