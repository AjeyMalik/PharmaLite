export interface ILogin {
  CompanyName: string;
  Password: string;
  UserID: string;
}

export interface IStandardAPIResponse<T = any> {
  Success: Boolean;
  Message: string;
  Data: T;
}
export interface IMenuItem {
  Name : string;
  URL: string;
}
export interface IMenuGroup {
  MenuGroup: string;
  MenuItems: IMenuItem[];
}

export interface IStatusContextType {
  message:string;
  type: string;
  updateStatus: Function;
}