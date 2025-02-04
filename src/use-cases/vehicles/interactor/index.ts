import { VehicleType } from "../entities"
import { IVehicleRepository } from "../repository"

interface IVehicleInteractor {
  getVehicleTypes: () => Promise<VehicleType[]>
}


export default class VehicleInteractor implements IVehicleInteractor {
  private VehicleRepository: IVehicleRepository

  constructor(VehicleRepository: IVehicleRepository) {
    this.VehicleRepository = VehicleRepository
  }

  getVehicleTypes: IVehicleInteractor['getVehicleTypes'] = () => {
    return this.VehicleRepository.getVehicleTypes()
  }
}
