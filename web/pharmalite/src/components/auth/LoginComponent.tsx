import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Formik } from "formik";
import { ILogin } from "index/vm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import { setToken } from "index/services/util/UtilService";
import { getCompanyName, loginToApp } from "index/services/auth/AuthService";
import AppTextInput from "index/shared/inputs/AppTextInput";

interface LoginComponentProps {}

const LoginComponent: React.FunctionComponent<LoginComponentProps> = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    getCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCompany = async () => {
    await getCompanyName().then(
      function (successResponse) {
        if (successResponse && successResponse.resultMessage) {
          setCompanyName(successResponse.resultMessage);
        }
      },
      function (errorResponse) {
        console.error(errorResponse);
      }
    );
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card variant="outlined">
            <CardHeader
              title="Login"
              sx={{ backgroundColor: "#2196f3", color: "#fff" }}
            />
            <CardContent>
              <Formik
                initialValues={{
                  networkid: "",
                  password: "",
                  Company: companyName,
                }}
                validate={(values) => {
                  let errors: any = {};
                  if (!values.networkid) {
                    errors.networkid = "User ID is Required";
                  }
                  if (!values.password) {
                    errors.password = "Password is Required";
                  }
                  return errors;
                }}
                onSubmit={async (values: ILogin, { setSubmitting }) => {
                  let result: any = await loginToApp({
                    ...values,
                    Company: companyName,
                  });
                  if (result && result.resultMessage) {
                    setToken(
                      (result && result?.resultMessage) || "",
                      values.networkid
                    );
                    localStorage.setItem("company", companyName);
                    router.push("/dashboard");
                  } else {
                    // showToast(result.Message, "error");
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <AppTextInput
                      name="networkid"
                      label="User ID*"
                      onChange={handleChange}
                      placeholder=" "
                      onBlur={handleBlur}
                      value={values.networkid}
                      error={
                        errors.networkid && touched.networkid ? true : false
                      }
                      errorText={
                        errors.networkid && touched.networkid
                          ? errors.networkid
                          : ""
                      }
                    />
                    <AppTextInput
                      name="password"
                      label="Password*"
                      onChange={handleChange}
                      type="password"
                      placeholder=" "
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password && touched.password ? true : false}
                      errorText={
                        errors.password && touched.password
                          ? errors.password
                          : ""
                      }
                    />
                    <AppTextInput
                      name="Company"
                      label="Company*"
                      onChange={handleChange}
                      disabled={true}
                      placeholder=" "
                      onBlur={handleBlur}
                      value={companyName}
                      error={errors.Company && touched.Company ? true : false}
                      errorText={
                        errors.Company && touched.Company ? errors.Company : ""
                      }
                    />
                    <br />
                    <br />
                    <Grid justifyContent={"center"} container>
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          Login
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LoginComponent;
