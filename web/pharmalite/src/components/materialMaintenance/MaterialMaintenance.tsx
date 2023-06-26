import * as React from "react";
import { Grid, Card, CardContent, IconButton } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import { Formik } from "formik";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import QueueIcon from "@mui/icons-material/Queue";
import CustomDialogComponent from "../common/CustomeDialogComponent";
import MaterialSearch from "./MaterialMaintenanceDialog";
interface MaterialMaintenanceMainProps {}

const MaterialMaintenanceMain: React.FC<MaterialMaintenanceMainProps> = () => {
  const [isDialog, setIsDialog] = useState(false);
  const handleDialogClose = () => {
    setIsDialog(false);
  };
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Material Receipts</h2>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Formik
                enableReinitialize
                initialValues={{
                  material: "",
                  type: "",
                  UOM: "",
                  materialId: "",
                  description: "",
                  grNumber: "",
                  shipmentNumber: "",
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
                          <Grid item xs={12} sm={5} md={3} lg={4}>
                            <Grid container>
                              <Grid item className="flex-1">
                                <AppTextInput
                                  disabled
                                  name="material"
                                  label="Material"
                                  type="text"
                                  value={values.material}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  //   endAdornment={
                                  //     <ContentCopyIcon
                                  //       className="pointer"
                                  //       onClick={() => {
                                  //         console.log("test");
                                  //       }}
                                  //     />
                                  //   }
                                ></AppTextInput>
                              </Grid>
                              <Grid item>
                                <IconButton
                                  color="primary"
                                  onClick={() => setIsDialog(true)}
                                  sx={{
                                    backgroundColor: "#ddd",
                                    marginTop: "10%",
                                  }}
                                >
                                  <QueueIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
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
                                touched.shipmentNumber && errors.shipmentNumber
                                  ? true
                                  : false
                              }
                              errorText={errors.shipmentNumber}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}></Grid>
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
      {isDialog && (
        <CustomDialogComponent
          title="Material Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          variant="lg"
          hideCloseButton
        >
          <MaterialSearch onClose={handleDialogClose} />
        </CustomDialogComponent>
      )}
    </React.Fragment>
  );
};

export default MaterialMaintenanceMain;
