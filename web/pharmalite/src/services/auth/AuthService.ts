import { ILogin, IStandardAPIResponse } from "index/vm";
import { httpClient, httpClientForLogin } from "../util/UtilService";

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
    let res = await httpClient<any>(`auth/getCompanyName`, "GET");
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}

export async function loginToApp(
  cred: ILogin
): Promise<IStandardAPIResponse<{ token: string }>> {
  try {
    let res = await httpClientForLogin<{ token: string }>(
      `Auth/ValidateLogIn`,
      "POST",
      { model: cred }
    );
    return res;
  } catch (err: any) {
    return err && err.response ? err.response.data : undefined;
  }
}
