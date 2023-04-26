"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Header from "./Header";

export default function UnAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Header/>
      <main style={{ padding: "16px" }}>{children}</main>
    </React.Fragment>
  );
}
