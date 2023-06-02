"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Header from "./Header";
import { getToken, isTokenExpired } from "index/services/util/UtilService";
import { ThemeProvider } from "@mui/material";
import { THEME } from "index/utils/Styles";

export default function UnAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // let hasTokenExpired = isTokenExpired();
    // if (!hasTokenExpired) {
    //   router.push("/dashboard");
    // }
    let token = getToken();
    console.log("--on unauthlayout enter--", token);
    if (token) {
      let unauthUrls = ["/"];
      let currentUrl = router.route;
      console.log("--if token, current route--", currentUrl);
      console.log("--if token, router obj--", router);
      if (unauthUrls.includes(currentUrl)) {
        router.push("/dashboard");
      }
    }
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <Header />
        <main style={{ height: "calc(100vh - 64px)", padding: "16px" }}>
          {children}
        </main>
      </ThemeProvider>
    </React.Fragment>
  );
}
