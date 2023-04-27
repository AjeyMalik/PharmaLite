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
        if (successResponse) {
          setCompanyName(successResponse);
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
                  UserID: "",
                  Password: "",
                  CompanyName: companyName,
                }}
                validate={(values) => {
                  let errors: any = {};
                  if (!values.UserID) {
                    errors.UserID = "User ID is Required";
                  }
                  if (!values.Password) {
                    errors.Password = "Password is Required";
                  }
                  return errors;
                }}
                onSubmit={async (values: ILogin, { setSubmitting }) => {
                  let result = await loginToApp({
                    ...values,
                    CompanyName: companyName,
                  });
                  if (result && result.Success) {
                    setToken((result.Data && result?.Data?.Token) || "");
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
                      name="UserID"
                      label="User ID*"
                      onChange={handleChange}
                      placeholder=" "
                      onBlur={handleBlur}
                      value={values.UserID}
                      error={errors.UserID && touched.UserID ? true : false}
                      errorText={
                        errors.UserID && touched.UserID ? errors.UserID : ""
                      }
                    />
                    <AppTextInput
                      name="Password"
                      label="Password*"
                      onChange={handleChange}
                      type="password"
                      placeholder=" "
                      onBlur={handleBlur}
                      value={values.Password}
                      error={errors.Password && touched.Password ? true : false}
                      errorText={
                        errors.Password && touched.Password
                          ? errors.Password
                          : ""
                      }
                    />
                    <AppTextInput
                      name="CompanyName"
                      label="Company*"
                      onChange={handleChange}
                      disabled={true}
                      placeholder=" "
                      onBlur={handleBlur}
                      value={values.CompanyName}
                      error={
                        errors.CompanyName && touched.CompanyName ? true : false
                      }
                      errorText={
                        errors.CompanyName && touched.CompanyName
                          ? errors.CompanyName
                          : ""
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
