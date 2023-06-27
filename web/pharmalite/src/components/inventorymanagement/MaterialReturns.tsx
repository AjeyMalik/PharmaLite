import * as React from "react";
import { Grid, Card, CardContent, Button, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from "@mui/material";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import { Formik } from "formik";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppButton from "index/shared/inputs/AppButton";
import SearchIcon from "@mui/icons-material/Search";
interface MaterialReturnsProps {}

const MaterialReturns: React.FC<MaterialReturnsProps> = () => {
  const [search, setSearch] = React.useState<any>({});
  const list = [
    {
      value: "one",
    },
    {
      value: "two",
    },
    {
      value: "three",
    },
    {
      value: "four",
    },
    {
      value: "five",
    },
  ];
 
  const [BOMvalue, setBOMValue] = React.useState("1");
  const handleBomChange = (event: React.SyntheticEvent, newValue: string) => {
    setBOMValue(newValue);
  };
  const [radioValue, setValues] = React.useState("workOrder");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((event.target as HTMLInputElement).value);
  };
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Material Returns</h3>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
            <Formik
                enableReinitialize
                initialValues={{
                  "Order#": "",
                 
                  Line: "",
                 
                  "Order Created On": "",
                  "Order Status": "",
                  STATUSID:"",
                  MATERIAL_TYPEID: "",
                  batch_quantity: "",
                  containerId:"",
                  selectedMaterial: "",
                  EFFECTIVE_DATE: "",
                  MATERIAL_NAME: "",
                  materilaReturnedQty: "",
                  DISPATCH_NO: "",
                  RETURNED_NOTEID:"",
                  ...list
                }}
                validate={(values: any) => {
                    let errors: any = {};
                    if (!values.DISPATCH_NO) {
                      errors.DISPATCH_NO = "Required";
                    }
  
                    return errors;
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
                  setFieldValue,
                }) => (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <FormControl>
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          gap="110px"
                        >
                          <Grid>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Material Returns
                            </FormLabel>
                          </Grid>
                          <Grid>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              color={"info"}
                              value={radioValue}
                              onChange={handleRadioChange}
                            >
                              <FormControlLabel
                                value="workOrder"
                                control={<Radio />}
                                label="Work Order"
                                color="info"
                              />
                              <FormControlLabel
                                value="others"
                                control={<Radio />}
                                label="Others"
                                color="info"
                              />
                            </RadioGroup>
                          </Grid>
                        </Grid>
                      </FormControl>

                      <Grid container spacing={2}>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              {radioValue === "workOrder" && (
                                <AppTextInput
                                disabled
                                  name="Order#"
                                  label="Work Order"
                                  type="text"
                                  value={values["Order#"]}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  
                                  error={
                                    touched["Order#"] && errors["Order#"]
                                      ? true
                                      : false
                                  }
                                  errorText={errors["Order#"]}
                                ></AppTextInput>
                              )}
                              {(radioValue === "others" ||
                                radioValue === "physicalVerification") && (
                                <AppTextInput
                                disabled
                                  name="containerId"
                                  label="Container ID"
                                  type="text"
                                  value={values.containerId}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                 
                                  error={
                                    touched["Order#"] && errors["Order#"]
                                      ? true
                                      : false
                                  }
                                  errorText={errors["Order#"]}
                                ></AppTextInput>
                              )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                                name="DISPATCH_NO"
                                label="Material Dispatch NoteID"
                                type="text"
                                value={values.DISPATCH_NO}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <SearchIcon
                                      className="pointer"
                                      onClick={() => {
                                        console.log("material");
                                      }}
                                    />
                                  }
                                  error={
                                    touched.DISPATCH_NO && errors.DISPATCH_NO
                                      ? true
                                      : false
                                  }
                                  errorText={errors.DISPATCH_NO}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppTextInput
                                disabled
                                name="Line"
                                label="Line"
                                type="text"
                                value={values["Line"]}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  touched["Line"] && errors["Line"]
                                    ? true
                                    : false
                                }
                                errorText={errors["Line"]}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppDatePicker
                                disabled
                                name="Order Created On"
                                label="Created On"
                                value={values["Order Created On"]}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppDatePicker>
                            </Grid>
                           
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppTextInput
                                disabled
                                name="Order Status"
                                label="Work Order Status"
                                type="text"
                                value={values["Order Status"]}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                           
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppTextInput
                                disabled
                                name="batch_quantity"
                                label="Batch Size"
                                type="text"
                                value={values.batch_quantity}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppSelectInput
                                name="STATUSID"
                                label="Status"
                                value="STATUSID"
                               
                                menuItems={list.map((x) => {
                                  return {
                                    label: x.value,
                                    value: x.value,
                                  };
                                })}
                                onBlur={handleBlur}
                                onChange={handleBomChange}
                              ></AppSelectInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppDatePicker
                                disabled
                                name="EFFECTIVE_DATE"
                                label="Effective Date"
                                value={values.EFFECTIVE_DATE}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              ></AppDatePicker>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={12}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                              <AppSelectInput
                                disabled
                                name="selectedMaterial"
                                label="Material"
                                value={values.selectedMaterial}
                                //  value={BOMvalue}
                                menuItems={list.map((x) => {
                                  return {
                                    label: x.value,
                                    value: x.value,
                                  };
                                })}
                                onBlur={handleBlur}
                                onChange={handleBomChange}
                              ></AppSelectInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                                disabled
                                name="MATERIAL_TYPEID"
                                label="FG/SFG Code"
                                type="text"
                                value={values.MATERIAL_TYPEID}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                                disabled
                                name="MATERIAL_NAME"
                                label="Description"
                                type="text"
                                value={values.MATERIAL_NAME}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AppTextInput
                                disabled
                                name="materilaReturnedQty"
                                label="Quantity Issued"
                                type="text"
                                value={values.materilaReturnedQty}
                                onBlur={handleBlur}
                                onChange={(e: any) => {}}
                              ></AppTextInput>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Grid container spacing={2} direction="row">
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <AppTextInput
                                name="RETURNED_NOTEID"
                                label="Material Returns NoteID"
                                type="text"
                                value={values.RETURNED_NOTEID}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <SearchIcon
                                      className="pointer"
                                      onClick={() => {
                                        console.log("material");
                                      }}
                                    />
                                  }
                                  error={
                                    touched.RETURNED_NOTEID && errors.RETURNED_NOTEID
                                      ? true
                                      : false
                                  }
                                  errorText={errors.RETURNED_NOTEID}
                              ></AppTextInput>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MaterialReturns;
