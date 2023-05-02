import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
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
  return (
    <React.Fragment>
      <Formik
        initialValues={
          modelingData ? modelingData : ({ company: companyName } as any)
        }
        validate={(values: any) => {
          let errors: any = {};
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const obj = { ...values };
          let result = await addOrUpdateObjectDetails(type, obj);
          if (result && result.errorNo === 0) {
            onClose(values);
          }else{
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
          setFieldError,
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
                          />
                        </Grid>
                      )}
                    {item.uireturntype === "SINGLE" &&
                      item.field_type === "DATETIME" && (
                        <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                          <AppDatePicker
                            label={item.field_caption}
                            name={item.field_name}
                            onBlur={() => {}}
                            disabled={item.readOnly != 0}
                            onChange={handleChange}
                            value={values[item.field_name] || ""}
                          />
                        </Grid>
                      )}
                    {item.uireturntype === "LIST" && (
                      <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                        <AppSelectInput
                          // menuItems={item.listValues}
                          menuItems={[
                            ...item.listValues,
                            { name: "All", value: "all" },
                          ]}
                          label={item.field_caption}
                          disabled={item.readOnly != 0}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values[item.field_name] || "all"}
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
