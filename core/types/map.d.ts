export type Coordinates = {
  lat: number
  lng: number
}


export type CashbackOfferCoordinatesType = {
  cashback_percentage: number
  category_id: number
} & Coordinates


