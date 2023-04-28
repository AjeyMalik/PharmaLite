import { IModelingSearch, IStandardAPIResponse } from "index/vm";
import { httpClient } from "../util/UtilService";

export async function getObjectDetails(
  type: string,
  data: IModelingSearch
): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`${type}/getObjectDetails`, "POST", data);
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}
