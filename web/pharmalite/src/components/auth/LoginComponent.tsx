import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { ILogin } from "index/vm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import { isTokenExpired, setToken } from "index/services/util/UtilService";
import { getCompanyName, loginToApp } from "index/services/auth/AuthService";

interface LoginComponentProps {}

const LoginComponent: React.FunctionComponent<LoginComponentProps> = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    let hasTokenExpired = isTokenExpired();
    if (!hasTokenExpired) {
      router.push("/dashboard");
    }
    getCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCompany = async () => {
    await getCompanyName().then(
      function (successResponse) {
        setCompanyName(successResponse);
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
              sx={{ backgroundColor: "#1565c0", color: "#fff" }}
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
                    setToken(result.Token as any);
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
                    <FormControl margin="normal" required fullWidth>
                      <TextField
                        variant="standard"
                        size="small"
                        id="UserID"
                        name="UserID"
                        label="User ID*"
                        autoComplete="UserID"
                        autoFocus
                        onChange={handleChange}
                        error={errors.UserID && touched.UserID ? true : false}
                        helperText={
                          errors.UserID && touched.UserID && errors.UserID
                        }
                        onBlur={handleBlur}
                        value={values.UserID}
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <TextField
                        variant="standard"
                        size="small"
                        name="Password"
                        type="password"
                        label="Password*"
                        autoComplete="current-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.Password && touched.Password ? true : false
                        }
                        helperText={
                          errors.Password && touched.Password && errors.Password
                        }
                        value={values.Password}
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <TextField
                        variant="standard"
                        disabled
                        size="small"
                        name="CompanyName"
                        label="Company*"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors.CompanyName && touched.CompanyName
                            ? true
                            : false
                        }
                        helperText={
                          errors.CompanyName &&
                          touched.CompanyName &&
                          errors.CompanyName
                        }
                        value={companyName}
                      />
                    </FormControl>
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
