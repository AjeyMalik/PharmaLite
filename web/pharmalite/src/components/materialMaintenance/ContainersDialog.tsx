import { Grid } from "@mui/material";
import { Formik } from "formik";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppTextInput from "index/shared/inputs/AppTextInput";
import * as React from "react";
interface ContainersDialogProps {
  onContainersClose: Function;
}

const ContainersDialog: React.FC<ContainersDialogProps> = ({
  onContainersClose,
}) => {
  const [search, setSearch] = React.useState<any>({
    CONTAINER_ID: "",
    VENDOR_BATCH_NO: "",
    CONTROL_NUMBER: "",
    MANUFACTURED_BY: "",
    MANUFACTURING_DATE: "",
    EXPIRATION_DATE: "",
    RECEIVED_BY: "",
    RECEIVED_DATE: "",
  });
  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={search}
        validate={(values) => {
          let errors: any = {};
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
            <Grid
              container
              spacing={2}
              justifyContent="start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <h3>SHIPMENT DETAILS</h3>
                  </Grid>
                  <Grid item xs={6}>
                    <h3>CONTAINER DETAILS</h3>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  xs={12}
                  spacing={2}
                  direction="row"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AppTextInput
                      name="CONTAINER_ID"
                      label="Container Id"
                      type="text"
                      value={values.CONTAINER_ID}
                      onBlur={handleBlur}
                      onChange={(e: any) => {}}
                    ></AppTextInput>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AppTextInput
                      name="VENDOR_BATCH_NO"
                      label="Batch No"
                      type="text"
                      value={values.VENDOR_BATCH_NO}
                      onBlur={handleBlur}
                      onChange={(e: any) => {}}
                    ></AppTextInput>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AppTextInput
                      name="CONTROL_NUMBER"
                      label="Control No"
                      type="text"
                      value={values.CONTROL_NUMBER}
                      onBlur={handleBlur}
                      onChange={(e: any) => {}}
                    ></AppTextInput>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AppTextInput
                      name="MANUFACTURED_BY"
                      label="Manufactured By"
                      type="text"
                      value={values.MANUFACTURED_BY}
                      onBlur={handleBlur}
                      onChange={(e: any) => {}}
                    ></AppTextInput>
                  </Grid>
                </Grid>

                <Grid
                  container
                  xs={12}
                  spacing={2}
                  direction="row"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AppDatePicker
                      disabled
                      name="MANUFACTURING_DATE"
                      label="Expiry Date"
                      value={values.MANUFACTURING_DATE}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></AppDatePicker>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AppDatePicker
                      disabled
                      name="EXPIRATION_DATE"
                      label="Expiry Date"
                      value={values.EXPIRATION_DATE}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></AppDatePicker>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AppTextInput
                      name="RECEIVED_BY"
                      label="Received By"
                      type="text"
                      value={values.RECEIVED_BY}
                      onBlur={handleBlur}
                      onChange={(e: any) => {}}
                    ></AppTextInput>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <AppTextInput
                      name="RECEIVED_DATE"
                      label="Received Date"
                      type="text"
                      value={values.RECEIVED_DATE}
                      onBlur={handleBlur}
                      onChange={(e: any) => {}}
                    ></AppTextInput>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ContainersDialog;
