import AuthLayout from "index/components/common/AuthLayout";
import ModelingTypesComponent from "index/components/modeling/ModelingTypesComponent";
import { getCompany } from "index/services/util/UtilService";
// import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { useState, useEffect } from "react";

// export const getServerSideProps: GetServerSideProps<{
//   data: any;
// }> = async ({ query, params }) => {
//   return {
//     props: {
//       data: { query, params },
//     },
//   };
// };

interface ModelingTypePageProps {}

const ModelingTypePage: React.FunctionComponent<ModelingTypePageProps> = () => {
  const [data, setData] = React.useState<any>({});
  const [companyName, setcompanyName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    let queryParams = router.query;
    setData(queryParams);
    let company = getCompany();
    setcompanyName(company);
  }, [router]);

  return (
    <>
      <Head>
        <title>Modeling - {companyName}</title>
        <meta name="description" content="Description of Modeling" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <React.Fragment>
        <AuthLayout>
          <ModelingTypesComponent type={data && data["type"]} />
        </AuthLayout>
      </React.Fragment>
    </>
  );
};

export default ModelingTypePage;
