import MockedVehicleTypesResponse from "./db/vehicle-types.json";
import MockedThirdDiscountsResponse from "./db/third-discounts.json";
import MockedInsureComponyListResponse from "./db/insure-companies.json";

export class MockResponseFactory {
  private mockDataPaths: Record<string, unknown> = {
    "/product/third/companies": MockedInsureComponyListResponse,
    "/product/third/third-discounts": MockedThirdDiscountsResponse,
    "/product/vehicle/types": MockedVehicleTypesResponse,
  };

  async getMockResponse(url: string) {
    const filePath = Object.keys(this.mockDataPaths).find(path => url.includes(path));
    if (!filePath) {
      return { message: "MOCKED_RESPONSE" };
    }
    return this.mockDataPaths[filePath];
  }
}
