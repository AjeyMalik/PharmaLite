export interface ILogin {
  // CompanyName: string;
  // Password: string;
  // UserID: string;
  Company: string;
  networkid: string;
  password: string;
}

export interface IStandardAPIResponse<T = any> {
  // Success: Boolean;
  // Message: string;
  // Data: T;

  id: any;
  resultMessage: string;
  sqlString: any;
  errorNo: number;
  dTable: any[];
  columnDetails: any[];
  formLoadData: any;
}
export interface IMenuItem {
  Name: string;
  URL: string;
}
export interface IMenuGroup {
  MenuGroup: string;
  MenuItems: IMenuItem[];
}

export interface IStatusContextType {
  message: string;
  type: string;
  updateStatus: Function;
}
export interface ISideMenuManageContextType {
  open: boolean;
  selectedMenuGroup: string;
  updateOpenStats: Function;
  updateSelectedMenuGroup: Function;
}

export interface IModelingSearch {
  batcH_SIZE?: string;
  effectivE_DATE?: string;
  haS_WIP?: string;
  Company?: string;
  name?: string;
  BOMID?: string;
  revision?: string;
  boM_STATUSID?: string;
  ordeR_STATUSID?: string;
}

export interface IDrawerOpen {
  isOpen: boolean;
  index?: number;
}
