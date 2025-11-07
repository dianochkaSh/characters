export interface IProduct {
  id: number,
  name: string,
  image?: string,
  location?: ILocation,
  species: string,
  gender: string,
  origin?: string,
  status?: string,
  type?: string,
  episode? : string
  url? : string
  created? : string
}
export interface ILocation {
  name: string,
  url: string,
}
export enum IGenderConst {
   MALE = 'male',
   FEMALE = 'female',
   GENDERLESS = 'genderless'
}


