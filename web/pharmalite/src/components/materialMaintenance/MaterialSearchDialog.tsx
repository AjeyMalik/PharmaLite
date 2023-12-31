import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AppButton from "index/shared/inputs/AppButton";
import AppTextInput from "index/shared/inputs/AppTextInput";
import { Formik } from "formik";

interface MaterialProps {
  onClose: Function;
}
const MaterialSearch: React.FunctionComponent<MaterialProps> = ({
  onClose
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [search, setSearch] = React.useState<any>();

  const list = [
    { name: "MATERIAL_MASTERID" },
    { name: "MODIFIEDBY" },
    { name: "MODIFIEDON" },
    { name: "STATUS" },
    { name: "PARENTID" },
    { name: "Name" },
    { name: "DESCRIPTION" },
    { name: "UOMID" },
    { name: "MATERIAL_TYPEID" },
    { name: "Company" },
  ];

  const materialSearchArray = [
    {
      MATERIAL_MASTERID: 1160100011,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      NAME: "Activated Carbon",
      DESCRIPTION: "Activated Carbon",
      UOMID: 11501100113,
      MATERIAL_TYPEID: 11501100141,
      Company: "PharmaLite",
    },
    {
      MATERIAL_MASTERID: 1160100011,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      NAME: "Activated Carbon",
      DESCRIPTION: "Activated Carbon",
      UOMID: 11501100113,
      MATERIAL_TYPEID: 11501100141,
      Company: "PharmaLite",
    },
    {
      MATERIAL_MASTERID: 1160100011,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      NAME: "Activated Carbon",
      DESCRIPTION: "Activated Carbon",
      UOMID: 11501100113,
      MATERIAL_TYPEID: 11501100141,
      Company: "PharmaLite",
    },
    {
      MATERIAL_MASTERID: 1160100011,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      NAME: "Activated Carbon",
      DESCRIPTION: "Activated Carbon",
      UOMID: 11501100113,
      MATERIAL_TYPEID: 11501100141,
      Company: "PharmaLite",
    },
    {
      MATERIAL_MASTERID: 1160100011,
      MODIFIEDBY: "superadmin",
      MODIFIEDON: "2018-11-14T18:10:51",
      STATUS: 0,
      PARENTID: "",
      NAME: "Activated Carbon",
      DESCRIPTION: "Activated Carbon",
      UOMID: 11501100113,
      MATERIAL_TYPEID: 11501100141,
      Company: "PharmaLite",
    },
  ];
  return (
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

    <Grid container spacing={2} alignItems="center">
      <Grid item xs={9}>
        <AppTextInput
          onChange={() => console.log("search")}
          type="search"
          value=''
          label="Search For"
          // color="primary"
          fullWidth={true}
          onBlur={handleBlur}
          // variant="standard"
          name="search"
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          startIcon={<SearchIcon />}
          sx={{
            color: "black",
            fontWeight: "bold",
            boxShadow: 5,
            fontSize: 13,
          }}
        >
          search
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          className="bordered-table"
          sx={{
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-thumb": { bgcolor: "#002699" },
            "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" },
          }}
        >
          <Table style={{ border: "1px solid black" }}>
            <TableHead style={{ backgroundColor: "#248f8f" }}>
              <TableRow>
                {list.map((plans) => (
                  <TableCell key={""}>
                    <Typography
                      fontWeight="bold"
                      color="white"
                      fontSize={15}
                      maxWidth="100%"
                      lineHeight={1}
                    >
                      {plans.name}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow style={{ backgroundColor: "lightGray" }}> */}
              {materialSearchArray.map((ele, index: any) => (
                <TableRow
                  key={index}
                  className={`${selectedIndex===index?'selected-table-row':''}`}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                >
                  <TableCell>{ele.MATERIAL_MASTERID}</TableCell>
                  <TableCell>{ele.MODIFIEDBY}</TableCell>
                  <TableCell>{ele.MODIFIEDON}</TableCell>
                  <TableCell>{ele.STATUS}</TableCell>
                  <TableCell>{ele.PARENTID}</TableCell>
                  <TableCell>{ele.NAME}</TableCell>
                  <TableCell>{ele.DESCRIPTION}</TableCell>
                  <TableCell>{ele.UOMID}</TableCell>
                  <TableCell>{ele.MATERIAL_TYPEID}</TableCell>
                  <TableCell>{ele.Company}</TableCell>
                </TableRow>
              ))}
              {/* </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid> */}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <br />
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <AppButton
              size="medium"
              btnText="Cancel"
              variant="outlined"
              // sx={{
              //   boxShadow: 4,
              //   color: "black",
              //   fontWeight: "bold",
              //   borderRadius: 1,
              // }}
              type="button"
              className="cancel-btn"
              color="primary"
              onClick={() => onClose()}    
            />
          </Grid>
          <Grid item>
            <AppButton
              btnText="Select"
              type="button"
              onClick={()=>{onClose(materialSearchArray[selectedIndex])}}
              variant="contained"
              className="add-btn"
              color="primary"
              disabled={selectedIndex==-1}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>Status Message:</Typography>
      </Grid>
    </Grid>
      </form>
    )}
    </Formik>
  );
};
export default MaterialSearch;
