"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Header from "./Header";
import { getToken, isTokenExpired } from "index/services/util/UtilService";
import { ThemeProvider } from "@mui/material";
import { THEME } from "index/utils/Styles";
import StatusProvider from "../../providers/StatusProvider";
import Footer from "./Footer";
import SideMenuManageProvider from "index/providers/SideMenuManageProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ConfirmDialogProvider } from "index/providers/ConfirmDialogProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // let hasTokenExpired = isTokenExpired();
    // if (hasTokenExpired) {
    //   router.push("/");
    // }
    let token = getToken();
    if (!token) {
      router.push("/");
    }
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={THEME}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StatusProvider>
            <SideMenuManageProvider>
              <ConfirmDialogProvider>
                <CssBaseline />
                <Header />
                <main style={{ height: "calc(100vh - 96px)", padding: "16px" }}>
                  {children}
                </main>
                <Footer />
              </ConfirmDialogProvider>
            </SideMenuManageProvider>
          </StatusProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
