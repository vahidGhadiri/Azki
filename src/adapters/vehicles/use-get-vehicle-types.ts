import { useQuery } from "@tanstack/react-query"
import { VehicleType, VehicleUseCaseProvider } from "src/use-cases/vehicles"


const useGetVehicleTypes = (options?: AdapterOptionType<VehicleType[]>) =>
  useQuery<VehicleType[], ErrorResponse>({
    queryFn: () => VehicleUseCaseProvider().getVehicleTypes(),
    queryKey: ["VEHICLE_TYPE"],
    ...options
  })


export default useGetVehicleTypes
