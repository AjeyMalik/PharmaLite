import { IModelingSearch, IStandardAPIResponse } from "index/vm";
import { httpClient } from "../util/UtilService";

export async function getIntimationSlipStatusList(
  type: string,
  company: string
): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`Audit/GetIntimationSlipStatusList`, "GET");
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function saveSelfInspectionIntimationSlip(
  data: any
): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(
      `qualityAssurance/selfInspectionIntimationSlip`,
      "POST",
      data
    );
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}
