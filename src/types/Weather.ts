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

export const weatherTitle = {
  dt_txt: '시간' ,
  temp: '온도' ,
  feels_like: '체감온도',
  temp_min: '최저기온',
  temp_max:  '최고기온',
  humidity: '습도',
  main: '날씨',
  description:'상세',
}

export enum WeatherPath {
  weather = 'weather',
  forecast = 'forecast',
}
