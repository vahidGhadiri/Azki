export interface Usage {
  id: number
  title: string
}


export interface VehicleType {
  id: number
  title: string
  usages: Usage[]
}

