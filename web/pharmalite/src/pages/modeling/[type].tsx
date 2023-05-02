import AuthLayout from "index/components/common/AuthLayout";
import ModelingTypesComponent from "index/components/modeling/ModelingTypesComponent";
import { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";

export const getServerSideProps: GetServerSideProps<{
  data: any;
}> = async ({ query, params }) => {
  return {
    props: {
      data: { query, params },
    },
  };
};

interface ModelingTypePageProps {}

const ModelingTypePage: React.FunctionComponent<ModelingTypePageProps> = ({
  data,
}: any) => {
  console.log("ModelingType -- ", data);
  return (
    <>
      <Head>
        <title>Modeling - PharmaLite</title>
        <meta name="description" content="Description of Modeling" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <ModelingTypesComponent type={data&&data.params&&data.params["type"]} />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default ModelingTypePage;