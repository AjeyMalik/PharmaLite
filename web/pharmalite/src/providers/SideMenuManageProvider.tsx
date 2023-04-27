import { ISideMenuManageContextType } from "index/vm";
import * as React from "react";
import { useState, useEffect } from "react";

export const SideMenuManageContext =
  React.createContext<ISideMenuManageContextType>({
    open: false,
    selectedMenuGroup: "",
    updateOpenStats: () => {},
    updateSelectedMenuGroup: () => {},
  });

const SideMenuManageProvider: React.FunctionComponent<any> = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedMenuGroup, setSelectedMenuGroup] = useState("");

  useEffect(() => {
    let selectedMenuGroupFromLocal = localStorage.getItem("selectedMenuGroup");
    if (selectedMenuGroupFromLocal) {
      setSelectedMenuGroup(selectedMenuGroupFromLocal);
    }
  }, []);

  const sidemenuManageContext = React.useMemo(
    () => ({
      open,
      selectedMenuGroup,
      updateOpenStats: (isOpen: boolean) => {
        setOpen(isOpen);
      },
      updateSelectedMenuGroup: (item: string) => {
        setSelectedMenuGroup(item);
      },
    }),
    [open, selectedMenuGroup]
  );
  return (
    <SideMenuManageContext.Provider value={sidemenuManageContext}>
      {props.children}
    </SideMenuManageContext.Provider>
  );
};

export default SideMenuManageProvider;
