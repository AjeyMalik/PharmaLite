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
import { Form, Formik, FormikContext } from "formik";
import { IGRNdetails } from "index/vm";
import BMRSearch from "./BmrSearchDialog";
// import AppTextInput from "";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import QueueIcon from "@mui/icons-material/Queue";
import CustomDialogComponent from "../common/CustomDialogComponent";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import AppTextInput from "index/shared/inputs/AppTextInput";
import AppButton from "index/shared/inputs/AppButton";
import AppDateSelect from "index/shared/inputs/AppDateSelect";
import { setConstantValue } from "typescript";

interface BMRfacilityClearanceProps {};
const BMRfacilityClearance: React.FunctionComponent<BMRfacilityClearanceProps> = () => {
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
  const handleChange1=(values:any)=>{
      
  }
 
  
  return (
    <>
      <Grid container >
        <Grid item xs={12}>
          <Typography fontWeight="bold">Facility Clearance</Typography>
          <Grid item xs={12}>
            <Formik
              initialValues={
                {
                  fmrNumber: "",
                  ReqDate: "",
                  Description: "",
                  WorkOrderType: "facility clearance",
                  FmrStatus: "",
                  TypeClean: "",
                  Area:"",
                  ProdLine:"",
                  LastProdMan:"",
                  LastBatchCompDate:"",
                  NextProdPlanned:"",
                  NextBatchDate:"",
                  RequestBy:"superadmin",
                  ReceivedBy:"",
                 
                } 
                
              }
             
              onSubmit ={ values => {
                const obj = { ...values };
                console.log(obj);
              }}

            >
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                isSubmitting,
                resetForm,
              }) => (
                <Card sx={{ px:8 ,my:2}}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="fmrNumber"
                            label="FMR Number"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            value={values.fmrNumber}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
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
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppDateSelect
                           
                            name="ReqDate"
                            label="Requisition Date"
                            
                            
                            onChange={(e: any) => {

                              let tempValue = e?.value || null;

                              setFieldValue("ReqDate", tempValue);

}}
                            value={values.ReqDate}
                            
                            onBlur={handleBlur}
                            
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="Description"
                            label="Description"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            
                            value={values.Description}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={2} sm={2} md={2} lg={2}>
                        <FormControl margin="normal" required fullWidth>
                          <AppSelectInput
                            name="WorkOrderType"
                            label="Work Order Type"
                            menuItems={[{label:"Facility Clearance",value:"Facility Clearance"}]}
                           onChange={(e: any) => {

                                    let tempValue = e?.value || null;

                                    setFieldValue("ReasonCanc", tempValue);

 }}
                            onBlur={handleBlur}
                           
                            value={values.WorkOrderType}
                          ></AppSelectInput>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppSelectInput
                            name="FmrStatus"
                            label="FMR Status"
                            menuItems={[{label:"Not Started",value:"0"},{label:"Partially Completed" ,value:"1"},{label:"Completed",value:"2"}]}
                           onChange={(e: any) => {

                                    let tempValue = e?.value || null;

                                    setFieldValue("ReasonCanc", tempValue);

 }}
                            onBlur={handleBlur}
                           
                            value={values.WorkOrderType}
                          ></AppSelectInput>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppSelectInput
                            name="TypeClean"
                            label="Type of cleaning"
                            menuItems={[{label:"Type-A Cleaning",value:"A"},{label:"Type-B Cleaning" ,value:"B"},{label:"Type-C Cleaning",value:"C"}]}
                           onChange={(e: any) => {

                                    let tempValue = e?.value || null;

                                    setFieldValue("ReasonCanc", tempValue);

 }}
                            onBlur={handleBlur}
                           
                            value={values.WorkOrderType}
                          ></AppSelectInput>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="Area"
                            label="Area"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Area}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="ProdLine"
                            label="Production Line"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ProdLine}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={5} sm={5} md={5} lg={5}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="LastProdMan"
                            label="Last Product Manufactured"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            value={values.LastProdMan}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
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
                   
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppDateSelect 
                            name="LastBatchCompDate"
                            label="Last Batch Completion Date"
                           
                            onChange={(e: any) => {

                              let tempValue = e?.value || null;

                              setFieldValue("LastBatchCompDate", tempValue);

}}
                            
                            value={values.LastBatchCompDate}
                            onBlur={handleBlur}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={5} sm={5} md={5} lg={5}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="NextProdPlanned"
                            label="Next Product Planned"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.NextProdPlanned}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
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
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppDateSelect 
                            name="NextBatchDate"
                            label="Next Batch Planned on Date"
                            
                            onChange={(e: any) => {

                              let tempValue = e?.value || null;

                              setFieldValue("NextBatchDate", tempValue);

}}
                            value={values.NextBatchDate}
                            onBlur={handleBlur}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="RequestBy"
                            label="Request By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            value={values.RequestBy}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl margin="normal" required fullWidth>
                          <AppTextInput
                            name="ReceivedBy"
                            label="Received By"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                           
                            value={values.ReceivedBy}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
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
                              btnText="Save"/>
                            
                          </Grid>
                        </Grid>
                      </Grid>

                    </Grid>
                  </form>
                  {data && (
                    <Grid item xs={12}>
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
          variant="lg"
          hideCloseButton
        >
          <BMRSearch onClose={handleDialogClose} />
        </CustomDialogComponent>
      )}
    </>
  );
};

export default BMRfacilityClearance;
