import AuthLayout from "index/components/common/AuthLayout";
import DashboardComponent from "index/components/dashboard/DashboardComponent";
import Head from "next/head";
import * as React from "react";

interface DashboardPageProps {}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = () => {
  return (
    <>
      <Head>
        <title>Home Page - PharmaLite</title>
        <meta name="description" content="Description of PharmaLite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <DashboardComponent />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default DashboardPage;
