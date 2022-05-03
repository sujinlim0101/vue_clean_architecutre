export type WeatherEntity = {
  dt_txt?: string,
  temp: number,
  feels_like : number,
  temp_min : number,
  temp_max : number,
  humidity : number,
  main : string,
  description : string,
  icon: string
  id: number,
  pressure: number
}
