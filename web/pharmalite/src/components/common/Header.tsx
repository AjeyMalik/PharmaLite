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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect } from "react";
import {
  getToken,
  removeToken,
  setToken,
} from "index/services/util/UtilService";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { DrawerWidth } from "index/Constant";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    let token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setToken("token");
    router.push("/");
    setIsLoggedIn(true);
  };
  const logout = () => {
    removeToken();
    router.push("/login");
    setIsLoggedIn(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goto = (path: string) => {
    router.push(path || "");
  };

  return (
    <React.Fragment>
      <AppBar position="static" color="primary" className="gradiantHeader">
        <Container maxWidth={false}>
          <Toolbar disableGutters variant="dense">
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <React.Fragment>
              {isLoggedIn && (
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerOpen}
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </React.Fragment>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              PharmaLite
            </Typography>
            {isLoggedIn ? (
              <React.Fragment>
                <IconButton
                  sx={{ mr: 2 }}
                  color="inherit"
                  onClick={() => goto("/dashboard")}
                >
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
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Typography>Super Admin</Typography>
                  </MenuItem>
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
          width: DrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DrawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 48,
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
        {/* <List component="nav" dense={true}>
          {SideMenuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton disabled={item.isDisabled}>
                <ListItemText
                  primary={item?.name}
                  onClick={() => goto(item?.path)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
