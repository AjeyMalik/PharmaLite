"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Header from "./Header";
import { isTokenExpired } from "index/services/util/UtilService";
import { ThemeProvider } from "@mui/material";
import { THEME } from "index/utils/Styles";
import StatusProvider from "./StatusProvider";
import Footer from "./Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    let hasTokenExpired = isTokenExpired();
    if (hasTokenExpired) {
      router.push("/");
    }
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={THEME}>
        <StatusProvider>
          <CssBaseline />
          <Header />
          <main style={{ height: "calc(100vh - 96px)", padding: "16px" }}>
            {children}
          </main>
          <Footer />
        </StatusProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
