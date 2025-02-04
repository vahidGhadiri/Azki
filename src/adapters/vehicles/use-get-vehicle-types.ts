import { useQuery } from "@tanstack/react-query"
import { VehicleUseCaseProvider } from "@use-cases/vehicles"
import type { VehicleType } from "@use-cases/vehicles"



const useGetVehicleTypes = (options?: AdapterOptionType<VehicleType[]>) =>
  useQuery<VehicleType[], ErrorResponse>({
    queryFn: () => VehicleUseCaseProvider().getVehicleTypes(),
    queryKey: ["VEHICLE_TYPE"],
    ...options
  })


export default useGetVehicleTypes
