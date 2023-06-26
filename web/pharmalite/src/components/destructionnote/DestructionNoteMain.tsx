import * as React from "react";
import { Grid, Card, CardContent, Button } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppButton from "index/shared/inputs/AppButton";
import SearchIcon from "@mui/icons-material/Search";
interface DestructionNoteMainProps {}

const DestructionNoteMain: React.FC<DestructionNoteMainProps> = () => {
  const [search, setSearch] = React.useState<any>({});
  const menuItems = [
    {
      value: "abc",
    },
    {
      value: "abcd",
    },
    {
      value: "abcde",
    },
    {
      value: "abcdef",
    },
    {
      value: "abcdefg",
    },
  ];
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
                  DESTRUCTION_NOTE_ID: "",
                  requisitionDate: "",
                  requisitionFrom: "",
                  status: "",
                  material: "",
                  container: "",
                  quantity: "",
                  manufacturerOrSupplier: "",
                  batchNumber: "",
                  manufacturedDate: "",
                  expiryDate: "",
                  ReasonForDestruction: "",
                  methodForDestruction: "",
                }}
                validate={(values) => {
                  let errors: any = {};
                  if (!values.DESTRUCTION_NOTE_ID) {
                    errors.DESTRUCTION_NOTE_ID = "Required";
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
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              name="DESTRUCTION_NOTE_ID"
                              label="Destruction Note ID"
                              type="text"
                              value={values.DESTRUCTION_NOTE_ID}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <SearchIcon
                                  className="pointer"
                                  onClick={() => {
                                    console.log("test");
                                  }}
                                />
                              }
                              error={
                                touched.DESTRUCTION_NOTE_ID &&
                                errors.DESTRUCTION_NOTE_ID
                                  ? true
                                  : false
                              }
                              errorText={errors.DESTRUCTION_NOTE_ID}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppDatePicker
                              disabled
                              name="requisitionDate"
                              label="Requisition Date"
                              value={values.requisitionDate}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="requisitionFrom"
                              label="Requisition From"
                              type="text"
                              value={values.requisitionFrom}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppSelectInput
                              name="status"
                              label="Status"
                              value={values.status}
                              menuItems={menuItems.map((x) => {
                                return {
                                  label: x.value,
                                  value: x.value,
                                };
                              })}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppSelectInput>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="material"
                              label="Material"
                              type="text"
                              value={values.material}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="container"
                              label="Container"
                              type="text"
                              value={values.container}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="quantity"
                              label="Quantity"
                              type="text"
                              value={values.quantity}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="manufacturerOrSupplier"
                              label="Manufacturer / Supplier"
                              type="text"
                              value={values.manufacturerOrSupplier}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                              disabled
                              name="batchNumber"
                              label="Batch Number"
                              type="text"
                              value={values.batchNumber}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppDatePicker
                              disabled
                              name="manufacturedDate"
                              label="Manufactured Date"
                              value={values.manufacturedDate}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppDatePicker
                              disabled
                              name="expiryDate"
                              label="Expiry Date"
                              value={values.expiryDate}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></AppDatePicker>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <AppTextInput
                              disabled
                              name="ReasonForDestruction"
                              label="Reason for Destruction"
                              type="text"
                              value={values.ReasonForDestruction}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={2} direction="row">
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <AppTextInput
                              disabled
                              name="methodForDestruction"
                              label="Method for Destruction"
                              type="text"
                              value={values.methodForDestruction}
                              onBlur={handleBlur}
                              onChange={(e: any) => {}}
                            ></AppTextInput>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid
                          container
                          spacing={2}
                          direction="row"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <Grid item>
                            <AppButton
                              btnText="Cancel"
                              type="submit"
                              variant="outlined"
                              color="primary"
                            />
                          </Grid>
                          <Grid item>
                            <AppButton
                              disabled={isSubmitting}
                              btnText="Save"
                              type="submit"
                              variant="contained"
                              color="primary"
                            />
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

export default DestructionNoteMain;
