import * as React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import UnAuthLayout from "index/components/common/UnAuthLayout";
import LoginComponent from "index/components/auth/LoginComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Login - PharmaLite</title>
        <meta name="description" content="PharmaLite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <UnAuthLayout>
          <LoginComponent />
        </UnAuthLayout>
      </React.Fragment>
    </>
  );
}
