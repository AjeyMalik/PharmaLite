import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { IGRNdetails } from "index/vm";
// import AppTextInput from "";
import { useState } from "react";
import QueueIcon from "@mui/icons-material/Queue";
import CustomDialogComponent from "../common/CustomDialogComponent";
import GrnSearch from "./GrnSearchDialog";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppButton from "index/shared/inputs/AppButton";

interface GrnComponentProps {}

const GrnComponent: React.FunctionComponent<GrnComponentProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [data, setData] = useState(false);
  const handleDialogClose = () => {
    setIsDialog(false);
  };
  const containerDetails = [
    { name: "Container ID" },
    { name: "Vendor Batch No" },
    { name: "Manufacturing Date" },
    { name: "Exp Date" },
    { name: "Material Status" },
    { name: "Checklist" },
    { name: "Net Quantity" },
    { name: "Available Quantity" },
    { name: "Distr.Note" },
  ];
  return (
    <>
      <Grid container >
        <Grid item xs={12}>
          <Typography fontWeight="bold">GRN Details</Typography>
          <Grid item xs={12}>
            <Formik
              initialValues={
                {
                  grNumber: "",
                  grnDate: "",
                  material: "",
                  vendorId: "",
                  verifiedOn: "",
                  preparedBy: "",
                  arNo: "",
                  verifiedBy: "",
                  company: "",
                  shipmentNumber: "",
                  sentToQABy: "",
                  sentToQAOn: "",
                  analyzedBy: "",
                  analyzedOn: "",
                  qaApprovedBy: "",
                  qaApprovedOn: "",
                  qaRemarks: "",
                  qaTestDate: "",
                  qcApprovedBy: "",
                  qcApprovedOn: "",
                } as IGRNdetails
              }
              validate={(values: IGRNdetails) => {
                let errors: any = {};
                if (!values.grNumber) {
                  errors.grNumber = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const obj = { ...values };
                console.log(obj);
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
                <Card sx={{ px:4 }}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="grNumber"
                            label="GR Number"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.grNumber &&
                              (isSubmitted || touched.grNumber)
                              ? true
                              : false}
                            helperText={errors.grNumber &&
                              (isSubmitted || touched.grNumber) &&
                              errors.grNumber}
                            value={values.grNumber} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={0.5}>
                        <IconButton
                          color="primary"
                          onClick={() => setIsDialog(true)}
                          sx={{
                            backgroundColor: "whitesmoke",
                            marginTop: "55%",
                          }}
                        >
                          <QueueIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="material"
                            label="Material"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.material &&
                              (isSubmitted || touched.material)
                              ? true
                              : false}
                            helperText={errors.material &&
                              (isSubmitted || touched.material) &&
                              errors.material}
                            value={values.material} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="vendorId"
                            label="Vendor Id"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.vendorId &&
                              (isSubmitted || touched.vendorId)
                              ? true
                              : false}
                            helperText={errors.vendorId &&
                              (isSubmitted || touched.vendorId) &&
                              errors.vendorId}
                            value={values.vendorId} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="preparedBy"
                            label="Prepared By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.preparedBy &&
                              (isSubmitted || touched.preparedBy)
                              ? true
                              : false}
                            helperText={errors.preparedBy &&
                              (isSubmitted || touched.preparedBy) &&
                              errors.preparedBy}
                            value={values.preparedBy} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="arNo"
                            label="AR No"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.arNo && (isSubmitted || touched.arNo)
                              ? true
                              : false}
                            helperText={errors.arNo &&
                              (isSubmitted || touched.arNo) &&
                              errors.arNo}
                            value={values.arNo} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="grnDate"
                            label="GRN Date"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.grnDate && (isSubmitted || touched.grnDate)
                              ? true
                              : false}
                            helperText={errors.grnDate &&
                              (isSubmitted || touched.grnDate) &&
                              errors.grnDate}
                            value={values.grnDate} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="verifiedBy"
                            label="Verified By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.verifiedBy &&
                              (isSubmitted || touched.verifiedBy)
                              ? true
                              : false}
                            helperText={errors.verifiedBy &&
                              (isSubmitted || touched.verifiedBy) &&
                              errors.verifiedBy}
                            value={values.verifiedBy} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="verifiedOn"
                            label="Verified On"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.verifiedOn &&
                              (isSubmitted || touched.verifiedOn)
                              ? true
                              : false}
                            helperText={errors.verifiedOn &&
                              (isSubmitted || touched.verifiedOn) &&
                              errors.verifiedOn}
                            value={values.verifiedOn} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="company"
                            label="Company"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.company && (isSubmitted || touched.company)
                              ? true
                              : false}
                            helperText={errors.company &&
                              (isSubmitted || touched.company) &&
                              errors.company}
                            value={values.company} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="shipmentNumber"
                            label="Shipment Number"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.shipmentNumber &&
                              (isSubmitted || touched.shipmentNumber)
                              ? true
                              : false}
                            helperText={errors.shipmentNumber &&
                              (isSubmitted || touched.shipmentNumber) &&
                              errors.shipmentNumber}
                            value={values.shipmentNumber} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}></Grid>
                      <Grid item xs={3}></Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="sentToQABy"
                            label="Sent to QA By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.sentToQABy &&
                              (isSubmitted || touched.sentToQABy)
                              ? true
                              : false}
                            helperText={errors.sentToQABy &&
                              (isSubmitted || touched.sentToQABy) &&
                              errors.sentToQABy}
                            value={values.sentToQABy} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="sentToQAOn"
                            label="Sent to QA On"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.sentToQAOn &&
                              (isSubmitted || touched.sentToQAOn)
                              ? true
                              : false}
                            helperText={errors.sentToQAOn &&
                              (isSubmitted || touched.sentToQAOn) &&
                              errors.sentToQAOn}
                            value={values.sentToQAOn} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="analyzedBy"
                            label="Analyzed By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.analyzedBy &&
                              (isSubmitted || touched.analyzedBy)
                              ? true
                              : false}
                            helperText={errors.analyzedBy &&
                              (isSubmitted || touched.analyzedBy) &&
                              errors.analyzedBy}
                            value={values.analyzedBy} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="analyzedOn"
                            label="Analyzed On"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.analyzedOn &&
                              (isSubmitted || touched.analyzedOn)
                              ? true
                              : false}
                            helperText={errors.analyzedOn &&
                              (isSubmitted || touched.analyzedOn) &&
                              errors.analyzedOn}
                            value={values.analyzedOn} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="qaRemarks"
                            label="QA Remarks"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.qaRemarks &&
                              (isSubmitted || touched.qaRemarks)
                              ? true
                              : false}
                            helperText={errors.qaRemarks &&
                              (isSubmitted || touched.qaRemarks) &&
                              errors.qaRemarks}
                            value={values.qaRemarks} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="qaTestDate"
                            label="QA Test Date"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.qaTestDate &&
                              (isSubmitted || touched.qaTestDate)
                              ? true
                              : false}
                            helperText={errors.qaTestDate &&
                              (isSubmitted || touched.qaTestDate) &&
                              errors.qaTestDate}
                            value={values.qaTestDate} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="qcApprovedBy"
                            label="QC Approved By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.qcApprovedBy &&
                              (isSubmitted || touched.qcApprovedBy)
                              ? true
                              : false}
                            helperText={errors.qcApprovedBy &&
                              (isSubmitted || touched.qcApprovedBy) &&
                              errors.qcApprovedBy}
                            value={values.qcApprovedBy} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="qcApprovedOn"
                            label="QC Approved On"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.qcApprovedOn &&
                              (isSubmitted || touched.qcApprovedOn)
                              ? true
                              : false}
                            helperText={errors.qcApprovedOn &&
                              (isSubmitted || touched.qcApprovedOn) &&
                              errors.qcApprovedOn}
                            value={values.qcApprovedOn} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="qaApprovedBy"
                            label="QA Approved By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.qaApprovedBy &&
                              (isSubmitted || touched.qaApprovedBy)
                              ? true
                              : false}
                            helperText={errors.qaApprovedBy &&
                              (isSubmitted || touched.qaApprovedBy) &&
                              errors.qaApprovedBy}
                            value={values.qaApprovedBy} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="qaApprovedOn"
                            label="QA Approved On"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.qaApprovedOn &&
                              (isSubmitted || touched.qaApprovedOn)
                              ? true
                              : false}
                            helperText={errors.qaApprovedOn &&
                              (isSubmitted || touched.qaApprovedOn) &&
                              errors.qaApprovedOn}
                            value={values.qaApprovedOn} fullWidth={false}                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <br />
                        <Grid container justifyContent="flex-end" spacing={2} marginBottom={2}>
                          <Grid item>
                            <AppButton
                              variant="outlined"
                              color="primary"
                              className="clear-btn"
                              onClick={()=>resetForm()}
                              btnText="Clear"/>
                            
                          </Grid>
                          <Grid item>
                            <AppButton
                              type="submit"
                              variant="contained"
                              className="add-btn"
                              color="primary"
                              disabled={isSubmitting}
                              onClick={() => setIsSubmitted(true)}
                              btnText="Submit"/>
                            
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                  {data && (
                    <Grid item xs={12} marginBottom={7}>
                      <Typography fontWeight="bold">
                        Container Details
                      </Typography>
                      <TableContainer>
                        <Table>
                          <TableHead style={{ backgroundColor: "#248f8f" }}>
                            <TableRow>
                              {containerDetails.map((container,index) => (
                                <TableCell key={index}>
                                  <Typography
                                    fontWeight="bold"
                                    color="white"
                                    fontSize={15}
                                    maxWidth="100%"
                                    lineHeight={1}
                                  >
                                    {container.name}
                                  </Typography>
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )}
                </Card>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
      {isDialog && (
        <CustomDialogComponent
          title="GRN Search"
          onClose={() => handleDialogClose()}
          isOpen={true}
          variant='lg'
          hideCloseButton
        >
          <GrnSearch onClose={handleDialogClose} />
        </CustomDialogComponent>
      )}
    </>
  );
};

export default GrnComponent;
