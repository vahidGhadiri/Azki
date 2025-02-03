
export const vehicleServices = {
  getVehicleTypes: "/product/vehicle/types",
} as const

export type VehicleServices = typeof vehicleServices
