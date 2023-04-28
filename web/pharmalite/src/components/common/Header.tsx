import * as React from "react";
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  Box,
  List,
  ListItem,
  ListItemButton,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect } from "react";
import {
  getToken,
  isTokenExpired,
  parseJwt,
  removeToken,
} from "index/services/util/UtilService";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { SideMenuWidth } from "index/Constant";
import {
  getMenuGroupsFromApi,
  getModelingMenuFromApi,
} from "index/services/header/HeaderService";
import { IMenuGroup } from "index/vm";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SideMenuManageContext } from "index/providers/SideMenuManageProvider";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { open, selectedMenuGroup, updateOpenStats, updateSelectedMenuGroup } =
    React.useContext(SideMenuManageContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({} as any);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuGroups, setMenuGroups] = useState<IMenuGroup[]>([]);
  const [modelingMenu, setModelingMenu] = useState([]);

  useEffect(() => {
    // let hasTokenExpired = isTokenExpired();
    let token = getToken();
    let setSelectedMenuFromLocal = localStorage.getItem("selectedMenu");
    if (token) {
      setIsLoggedIn(true);
      setSelectedMenu(setSelectedMenuFromLocal || "");
      // let parsedToken = parseJwt();
      // setUser(parsedToken);
      // getMenuGroups();
    }
  }, []);

  // const getMenuGroups = async () => {
  //   await getMenuGroupsFromApi().then(
  //     function (successResponse) {
  //       if (successResponse && successResponse.Success) {
  //         let menuGroups =
  //           (successResponse?.Data && successResponse.Data) || [];
  //         setMenuGroups(menuGroups);
  //         getModelingMenu();
  //       }
  //     },
  //     function (errorResponse) {
  //       console.error(errorResponse);
  //     }
  //   );
  // };

  // const getModelingMenu = async () => {
  //   await getModelingMenuFromApi().then(
  //     function (successResponse) {
  //       if (successResponse && successResponse.Success) {
  //         setModelingMenu(
  //           (successResponse?.Data && successResponse.Data) || []
  //         );
  //       }
  //     },
  //     function (errorResponse) {
  //       console.error(errorResponse);
  //     }
  //   );
  // };

  const logout = () => {
    removeToken();
    router.push("/");
    setIsLoggedIn(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    updateOpenStats(true);
  };

  const handleDrawerClose = () => {
    updateOpenStats(false);
  };

  const goto = (path: string) => {
    router.push(path || "");
  };

  const toggleMenuGroup = (item: IMenuGroup) => {
    if (item.MenuGroup === selectedMenuGroup) {
      updateSelectedMenuGroup("");
    } else {
      updateSelectedMenuGroup(item.MenuGroup);
    }
  };

  const onMenuItemClicked = (group: IMenuGroup, item: string, path: string) => {
    updateSelectedMenuGroup(group.MenuGroup);
    setSelectedMenu(item);
    localStorage.setItem("selectedMenuGroup", group.MenuGroup);
    localStorage.setItem("selectedMenu", item);
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        className="gradiantHeader"
        sx={{ backgroundColor: "#1b68c0", height: 64 }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters variant="regular" sx={{ height: 64 }}>
            <React.Fragment>
              {isLoggedIn && (
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerOpen}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </React.Fragment>
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                height: 64,
                display: { xs: "none", md: "flex" },
              }}
            >
              <img src="/images/PharmaLite.png" alt="PharmaLite" />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              PharmaLite
            </Typography>
            {isLoggedIn ? (
              <React.Fragment>
                <IconButton color="inherit" onClick={() => goto("/dashboard")}>
                  <HomeIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Typography mr={1}>{user?.USER_ROLE || ""}</Typography>
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logout}>
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: SideMenuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: SideMenuWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 64,
            padding: theme.spacing(0, 1),
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
        <Divider />
        <List component="nav" dense={true}>
          {menuGroups.map((groupItem, groupIndex) => (
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
              key={groupIndex}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  toggleMenuGroup(groupItem);
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {groupItem?.MenuGroup || ""}
                </Typography>
                {groupItem.MenuGroup === selectedMenuGroup ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse
                in={groupItem.MenuGroup === selectedMenuGroup}
                timeout="auto"
                unmountOnExit
              >
                {groupItem.MenuGroup === "Modeling" ? (
                  <List component="div" disablePadding>
                    {modelingMenu.length > 0 &&
                      modelingMenu.map((menuItem, menuIndex) => (
                        <ListItemButton
                          key={menuIndex}
                          sx={{ pl: 4 }}
                          selected={
                            menuItem &&
                            menuItem[1] &&
                            menuItem[1] === selectedMenu
                              ? true
                              : false
                          }
                          onClick={() => {
                            onMenuItemClicked(
                              groupItem,
                              menuItem[1],
                              menuItem[0]
                            );
                          }}
                        >
                          <Typography variant="subtitle2">
                            {menuItem[1] || ""}
                          </Typography>
                        </ListItemButton>
                      ))}
                  </List>
                ) : (
                  <List component="div" disablePadding>
                    {groupItem.MenuItems.length > 0 &&
                      groupItem.MenuItems.map((menuItem, menuIndex) => (
                        <ListItemButton
                          key={menuIndex}
                          sx={{ pl: 4 }}
                          selected={
                            menuItem &&
                            menuItem?.Name &&
                            menuItem?.Name === selectedMenu
                              ? true
                              : false
                          }
                          onClick={() => {
                            onMenuItemClicked(
                              groupItem,
                              menuItem.Name,
                              menuItem.URL
                            );
                          }}
                        >
                          <Typography variant="subtitle2">
                            {menuItem?.Name || ""}
                          </Typography>
                        </ListItemButton>
                      ))}
                  </List>
                )}
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
