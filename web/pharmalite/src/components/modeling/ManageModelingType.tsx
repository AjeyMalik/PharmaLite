import { Grid } from "@mui/material";
import { Formik } from "formik";
import { StatusContext } from "index/providers/StatusProvider";
import {
  addOrUpdateObjectDetails,
  getTransactionObject,
} from "index/services/modeling/ModelingService";
import { getCompany } from "index/services/util/UtilService";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import moment from "moment";
import * as React from "react";
import Loading from "../common/Loading";
import AppButton from "index/shared/inputs/AppButton";

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
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmited, setSubmitted] = React.useState(false);

  return (
    <React.Fragment>
      {isLoading && <Loading message="processing.." />}
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
          setLoading(true);
          const obj = { ...values };
          var objectArr: string[] = [];
          Object.keys(obj).forEach(function (key) {
            objectArr.push(key);
            objectArr.push(obj[key]);
          });
          let transactionObj = await getTransactionObject(type, objectArr);
          if (transactionObj) {
            let result = await addOrUpdateObjectDetails(type, transactionObj);
            if (result && result.errorNo === 0) {
              setLoading(false);
              updateStatus(result?.resultMessage, "success");
              onClose(values);
            } else {
              setLoading(false);
              updateStatus(result?.resultMessage, "error");
              onClose();
            }
          } else {
            setLoading(false);
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
                            required={item.userrequired != 0}
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
                            required={item.userrequired != 0}
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
                            required={item.userrequired != 0}
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
                          required={item.userrequired != 0}
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
                  <AppButton
                    variant="outlined"
                    color="secondary"
                    className="cancel-btn"
                    onClick={() => onClose()}
                    btnText="Cancel"
                  />
                </Grid>
                <Grid item>
                  <AppButton
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
                    btnText={modelingData ? "Update" : "Add"}
                  />
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
