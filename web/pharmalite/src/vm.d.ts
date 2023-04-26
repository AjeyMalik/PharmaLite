export interface ILogin {
  CompanyName: string;
  Password: string;
  UserID: string;
}

export interface IStandardAPIResponse<T = any> {
  Success?: Boolean;
  Message?: string;
  Data?: T;
  Token?:string;
}
