
import { GridOptions, ColDef } from "ag-grid-community";
import React, { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Typography } from "@mui/material";
import AppButton from "index/shared/inputs/AppButton";
import { getAllGrn } from "index/services/grn/GrnService";
import { IGRNdetails } from "index/vm";
import AppTextInput from "index/shared/inputs/AppTextInput";

interface GrnSearchProps {
  onClose: Function;
}

const GrnSearch: React.FunctionComponent<GrnSearchProps> = ({ onClose }) => {
  const columnDefs: ColDef[] = [
    { headerName: "GOODS_RECEIPT_NOTIED", field: "goodsReceiptNotied" },
    { headerName: "MODIFIEDBY", field: "modifiedBy" },
    { headerName: "MODIFIEDON", field: "modifiedOn" },
    { headerName: "STATUS", field: "status" },
    { headerName: "PARENTID", field: "parentId" },
    { headerName: "GRM Date", field: "grmDate" },
    { headerName: "SHIPMENT_DETAILSID", field: "shipmentDetailsId" },
    { headerName: "Copy To ", field: "copyTo" },
    { headerName: "AR NUMBER", field: "arNumber" },
    { headerName: "Prepared By", field: "preparedBy" },
    { headerName: "Prepared On ", field: "preparedOn" },
    { headerName: "Verified By", field: "verifiedBy" },
    { headerName: "Sent to QA By", field: "sentToQABy" },
    { headerName: "Sent to QA On", field: "sentToQAOn" },
    { headerName: "Sent to QA Remarks", field: "sentToQARemarks" },
    { headerName: "QA Test Date", field: "qaTestDate" },
    { headerName: "MATERIAL_STATUSID", field: "materialStatusId" },
    { headerName: "QA Remarks", field: "qaRemarks" },
    { headerName: "Analysed By", field: "analysedBy" },
    { headerName: "Analysed By Date", field: "analysedByDate" },
    { headerName: "Approved By(QC)", field: "approbedByQC" },
    { headerName: "Approved By Date(QC)", field: "approbedByDateQC" },
    { headerName: "Approved By(QA)", field: "approvedBy" },
    { headerName: "Approved By Date(QA)", field: "approbedByDateQA" },
    { headerName: "Company", field: "company" },
  ];

  useEffect(() => {
    // fetchAllGrn();
  }, []);

  const [rowData, setRowData] = useState<IGRNdetails[]>([]);

  // const fetchAllGrn = async () => {
  //   let result = await getAllGrn();
  //   if (result && result.resultMessage) {
  //     setRowData(result?.dTable || []);
  //   }
  // };

  const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    suppressCellSelection: true,
    suppressContextMenu: true,
    suppressRowClickSelection: true,
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={9}>
        <AppTextInput
          onChange={() => console.log("search")}
          type="search"
          label="Search For"
          fullWidth={true}
          name="search"
          onBlur={undefined}
          value={undefined}
        />
      </Grid>
      <Grid item xs={3}>
        <AppButton
          startIcon={<SearchIcon />}
          variant="outlined"
          btnText="Search"
        />
      </Grid>
      
      <Grid item xs={12}>
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%" }}
        >
          <AgGridReact gridOptions={gridOptions} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <br />
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <AppButton
              size="medium"
              variant="outlined"
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
              btnText="Select"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>Status Message:</Typography>
      </Grid>
    </Grid>
  );
};

export default GrnSearch;


{/* <Grid item xs={12}>
//         <TableContainer
//           className="bordered-table"
//           sx={{
//             "&::-webkit-scrollbar": { width: "8px" },
//             "&::-webkit-scrollbar-thumb": { bgcolor: "#002699" },
//             "&::-webkit-scrollbar-track": { bgcolor: "#f1f1f1" },
//           }}
//         >
//           <Table style={{ border: "1px solid black" }}>
//             <TableHead style={{ backgroundColor: "#248f8f" }}>
//               <TableRow>
//                 {list.map((plans) => (
//                   <TableCell>
//                     <Typography
//                       fontWeight="bold"
//                       color="white"
//                       fontSize={15}
//                       maxWidth="100%"
//                       lineHeight={1}
//                     >
//                       {plans.name}
//                     </Typography>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {row &&
//                 row.map((row, index) => (
//                   <TableRow>
//                     <TableCell>{row.grNumber}</TableCell>
//                   </TableRow>
//                 ))}
//               <TableRow style={{ backgroundColor: "lightGray" }}>
//                 {Array.from({ length: 25 }).map((_, index) => (
//                   <TableCell key={index}></TableCell>
//                 ))}
//               </TableRow>
//               <TableRow style={{ backgroundColor: "lightGray" }}>
//                 {Array.from({ length: 25 }).map((_, index) => (
//                   <TableCell key={index}></TableCell>
//                 ))}
//               </TableRow>
//               <TableRow>
//                 {Array.from({ length: 25 }).map((_, index) => (
//                   <TableCell key={index}></TableCell>
//                 ))}
//               </TableRow>
//               <TableRow>
//                 {Array.from({ length: 25 }).map((_, index) => (
//                   <TableCell key={index}></TableCell>
//                 ))}
//               </TableRow>
//               <TableRow>
//                 {Array.from({ length: 25 }).map((_, index) => (
//                   <TableCell key={index}></TableCell>
//                 ))}
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid> */}