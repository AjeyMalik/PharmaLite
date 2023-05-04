import { IModelingSearch, IStandardAPIResponse } from "index/vm";
import { httpClient } from "../util/UtilService";

export async function getTableFieldCaptions(
  type: string,
  company: string
): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`query/getTableFieldCaptions`, "POST", {
      tablename: type,
      company: company,
    });
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function getTransactionObject(
  type: string,
  values: string[]
): Promise<any> {
  try {
    let res = await httpClient<any>(`query/getTransactionObject`, "POST", {
      ObjectName: type,
      InputValues: values,
    });
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}
export async function getListItemValues(
  field_query: string
): Promise<IStandardAPIResponse<any>> {
  try {
    let res = await httpClient<any>(`query/${field_query}`, "POST", {});
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function getObjectDetails(
  type: string,
  data: IModelingSearch
): Promise<IStandardAPIResponse<any>> {
  try {
    type = type.replaceAll("_", "").toLowerCase();
    let res = await httpClient<any>(`${type}/getObjectDetails`, "POST", data);
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function addOrUpdateObjectDetails(
  type: string,
  data: any
): Promise<IStandardAPIResponse<any>> {
  try {
    type = type.replaceAll("_", "").toLowerCase();
    let res = await httpClient<any>(`${type}/maintObjectDetails`, "POST", data);
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function removeObjectDetails(
  type: string,
  data: any
): Promise<IStandardAPIResponse<any>> {
  try {
    type = type.replaceAll("_", "").toLowerCase();
    let res = await httpClient<any>(
      `${type}/deleteObjectDetails`,
      "POST",
      data
    );
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}
