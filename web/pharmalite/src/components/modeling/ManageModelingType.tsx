import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
import { StatusContext } from "index/providers/StatusProvider";
import { addOrUpdateObjectDetails } from "index/services/modeling/ModelingService";
import { getCompany } from "index/services/util/UtilService";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import moment from "moment";
import * as React from "react";

interface ManageModelingTypeProps {
  type: string;
  modelingData?: any;
  fieldCaptions: any[];
  onClose: Function;
}

const ManageModelingType: React.FunctionComponent<ManageModelingTypeProps> = ({
  type,
  onClose,
  modelingData,
  fieldCaptions,
}) => {
  let companyName = getCompany();

  const { updateStatus } = React.useContext(StatusContext);
  const [isSubmited, setSubmitted] = React.useState(false);
  console.log("--fieldCaptions--", fieldCaptions);
  console.log("--modelingData--", modelingData);
  return (
    <React.Fragment>
      <Formik
        initialValues={
          modelingData ? modelingData : ({ company: companyName } as any)
        }
        validate={(values: any) => {
          let errors: any = {};
          fieldCaptions.forEach((ele) => {
            if (ele.userrequired != 0 && !values[ele.field_name]) {
              errors[ele.field_name] = "Required";
            }
          });
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const obj = { ...values };
          let result = await addOrUpdateObjectDetails(type, obj);
          if (result && result.errorNo === 0) {
            updateStatus(result?.resultMessage, "success");
            onClose(values);
          } else {
            updateStatus(result?.resultMessage, "error");
            onClose();
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
          setFieldValue,
        }) => (
          <div style={{ padding: "16px" }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {fieldCaptions.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.uireturntype === "SINGLE" &&
                      item.field_type === "STRING" && (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <AppTextInput
                            label={item.field_caption}
                            name={item.field_name}
                            type="text"
                            disabled={item.readOnly != 0}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values[item.field_name] || ""}
                            error={
                              errors[item.field_name] &&
                              (touched[item.field_name] || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors[item.field_name] &&
                              (touched[item.field_name] || isSubmited) &&
                              errors[item.field_name]
                            }
                          />
                        </Grid>
                      )}
                    {item.uireturntype === "SINGLE" &&
                      item.field_type === "NUMERIC" && (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <AppTextInput
                            label={item.field_caption}
                            name={item.field_name}
                            type="number"
                            disabled={item.readOnly != 0}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values[item.field_name] || ""}
                            error={
                              errors[item.field_name] &&
                              (touched[item.field_name] || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors[item.field_name] &&
                              (touched[item.field_name] || isSubmited) &&
                              errors[item.field_name]
                            }
                          />
                        </Grid>
                      )}
                    {item.uireturntype === "SINGLE" &&
                      item.field_type === "DATETIME" && (
                        <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                          <AppDatePicker
                            label={item.field_caption}
                            name={item.field_name}
                            onBlur={handleBlur}
                            disabled={item.readOnly != 0}
                            onChange={(e: any) => {
                              let tempValue = "";
                              if (e) {
                                tempValue = moment(e).toISOString();
                              }
                              setFieldValue(item.field_name, tempValue);
                            }}
                            value={values[item.field_name] || ""}
                            error={
                              errors[item.field_name] &&
                              (touched[item.field_name] || isSubmited)
                                ? true
                                : false
                            }
                            helperText={
                              errors[item.field_name] &&
                              (touched[item.field_name] || isSubmited) &&
                              errors[item.field_name]
                            }
                          />
                        </Grid>
                      )}
                    {item.uireturntype === "LIST" && (
                      <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                        <AppSelectInput
                          // menuItems={item.listValues}
                          menuItems={item.listValues}
                          label={item.field_caption}
                          name={item.field_name}
                          disabled={item.readOnly != 0}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values[item.field_name]}
                          error={
                            errors[item.field_name] &&
                            (touched[item.field_name] || isSubmited)
                              ? true
                              : false
                          }
                          helperText={
                            errors[item.field_name] &&
                            (touched[item.field_name] || isSubmited) &&
                            errors[item.field_name]
                          }
                        />
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
              <br />
              <Grid container justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="cancel-btn"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    className="add-btn"
                    color="primary"
                    onClick={() => {
                      if (!isSubmited) {
                        setSubmitted(true);
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    {modelingData ? "Update" : "Add"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ManageModelingType;
