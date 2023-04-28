import { ILogin, IStandardAPIResponse } from "index/vm";
import { httpClient } from "../util/UtilService";

export async function validateLicenseKey(): Promise<any> {
  try {
    let res = await httpClient<any>(`auth/validateLicense`, "GET");
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function getCompanyName(): Promise<any> {
  try {
    let res = await httpClient<any>(`auth/getLicensedtocompany`, "POST",{});
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function loginToApp(
  cred: ILogin
): Promise<IStandardAPIResponse<{ Token: string }>> {
  try {
    let res = await httpClient<{ Token: string }>(
      `auth/doLoginDetails`,
      "POST",
       cred 
    );
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}
