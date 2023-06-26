import * as React from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import { Formik } from "formik";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SearchIcon from "@mui/icons-material/Search";
interface MaterialMaintenanceMainProps {}

const MaterialMaintenanceMain: React.FC<MaterialMaintenanceMainProps> = () => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Destruction Note</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={{
                  material: "",
                  type:"",
                  UOM:"",
                  materialId:"",
                  description:"",
                  grNumber:"",
                  shipmentNumber:"",

               }}
                validate={(values) => {
                  let errors: any = {};
                  if (!values.shipmentNumber) {
                    errors.shipmentNumber = "Required";
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  console.log("test", values);
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
                  resetForm,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              disabled
                              name="material"
                              label="Material"
                              type="text"
                              value={values.material}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <ContentCopyIcon
                                  className="pointer"
                                  onClick={() => {
                                    console.log("test");
                                  }}
                                />
                              }
                             
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                          <AppTextInput
                              disabled
                              name="type"
                              label="Type"
                              type="text"
                              value={values.type}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                          <AppTextInput
                              disabled
                              name="UOM"
                              label="UOM"
                              type="text"
                              value={values.UOM}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              disabled
                              name="materialId"
                              label="Material ID"
                              type="text"
                              value={values.materialId}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={8} lg={8}>
                            <AppTextInput
                              disabled
                              name="description"
                              label="Description"
                              type="text"
                              value={values.description}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              disabled
                              name="grNumber"
                              label="GR Number"
                              type="text"
                              value={values.grNumber}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              name="shipmentNumber"
                              label="ShipmentNumber"
                              type="text"
                              value={values.shipmentNumber}
                              endAdornment={
                                <SearchIcon
                                  className="pointer"
                                  onClick={() => {
                                    console.log("test");
                                  }}
                                />
                              }
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                              error={
                                touched.shipmentNumber &&
                                errors.shipmentNumber
                                  ? true
                                  : false
                              }
                              errorText={errors.shipmentNumber}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            
                          </Grid>
                        </Grid>
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

export default MaterialMaintenanceMain;
