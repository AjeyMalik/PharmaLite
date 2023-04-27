import { IMenuGroup, IStandardAPIResponse } from "index/vm";
import { httpClient } from "../util/UtilService";

export async function getMenuGroupsFromApi(): Promise<IStandardAPIResponse<IMenuGroup[]>> {
  try {
    let res = await httpClient<IMenuGroup[]>(`menu/GetMenuGroups`, "GET");
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function getModelingMenuFromApi(): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`menu/getModelingMenu`, "GET");
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}
