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
import React, { useEffect, useState } from "react";
import TextFieldCommon from "../common/TextFieldCommon";
import SearchIcon from "@mui/icons-material/Search";
import AppButton from "index/shared/inputs/AppButton";
import { getAllGrn } from "index/services/grn/GrnService";
import { IGRNdetails } from "index/vm";

interface GrnSearchProps {
  onClose: Function;
}
const GrnSearch: React.FunctionComponent<GrnSearchProps> = ({ onClose }) => {
  const list = [
    { name: "GOODS_RECEIPT_NOTIED" },
    { name: "MODIFIEDBY" },
    { name: "MODIFIEDON" },
    { name: "STATUS" },
    { name: "PARENTID" },
    { name: "GRM Date" },
    { name: "SHIPMENT_DETAILSID" },
    { name: "Copy To " },
    { name: "AR NUMBER" },
    { name: "Prepared By" },
    { name: "Prepared On " },
    { name: "Verified By" },
    { name: "Sent to QA By" },
    { name: "Sent to QA On" },
    { name: "Sent to QA Remarks" },
    { name: "QA Test Date" },
    { name: "MATERIAL_STATUSID" },
    { name: "QA Remarks" },
    { name: "Analysed By" },
    { name: "Analysed By Date" },
    { name: "Approved By(QC)" },
    { name: "Approved By Date(QC)" },
    { name: "Approved By(QA)" },
    { name: "Approved By Date(QA)" },
    { name: "company" },
  ];
  useEffect(() => {
    fetchAllGrn();
  }, []);
  const [row, setRow] = useState<IGRNdetails[]>([]);
  const fetchAllGrn = async () => {
    let result = await getAllGrn();
    if (result && result.resultMessage) {
      setRow(result?.dTable || []);
      let obj = {};
      result?.dTable &&
        result?.dTable.length > 0 &&
        result?.dTable.forEach((ele) => {
          obj = { ...obj };
        });
      // setRow(obj);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={9}>
        <TextFieldCommon
          onChange={() => console.log("search")}
          type="search"
          label="Search For"
          color="primary"
          fullWidth={true}
          variant="standard"
          name="search"
        />
      </Grid>
      <Grid item xs={3}>
        <AppButton
          startIcon={<SearchIcon />}
          // sx={{
          //   color: "black",
          //   fontWeight: "bold",
          //   boxShadow: 5,
          //   fontSize: 13,
          // }}
          btnText="Search"
        />
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
                  <TableCell>
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
              {row &&
                row.map((row, index) => (
                  <TableRow>
                    <TableCell>{row.grNumber}</TableCell>
                  </TableRow>
                ))}
              {/* <TableRow style={{ backgroundColor: "lightGray" }}>
                {Array.from({ length: 25 }).map((_, index) => (
                  <TableCell key={index}></TableCell>
                ))}
              </TableRow>
              <TableRow style={{ backgroundColor: "lightGray" }}>
                {Array.from({ length: 25 }).map((_, index) => (
                  <TableCell key={index}></TableCell>
                ))}
              </TableRow>
              <TableRow>
                {Array.from({ length: 25 }).map((_, index) => (
                  <TableCell key={index}></TableCell>
                ))}
              </TableRow>
              <TableRow>
                {Array.from({ length: 25 }).map((_, index) => (
                  <TableCell key={index}></TableCell>
                ))}
              </TableRow>
              <TableRow>
                {Array.from({ length: 25 }).map((_, index) => (
                  <TableCell key={index}></TableCell>
                ))}
              </TableRow> */}
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

// import {
//   Button,
//   Grid,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import TextFieldCommon from "../common/TextFieldCommon";
// import SearchIcon from "@mui/icons-material/Search";

// interface GrnSearchProps {
//   onClose: Function;
// }
// const GrnSearch: React.FunctionComponent<GrnSearchProps> = ({ onClose }) => {
//   const list = [
//     { name: "GOODS_RECEIPT_NOTIED" },
//     { name: "MODIFIEDBY" },
//     { name: "MODIFIEDON" },
//     { name: "STATUS" },
//     { name: "PARENTID" },
//     { name: "GRM Date" },
//     { name: "SHIPMENT_DETAILSID" },
//     { name: "Copy To " },
//     { name: "AR NUMBER" },
//     { name: "Prepared By" },
//     { name: "Prepared On " },
//     { name: "Verified By" },
//     { name: "Sent to QA By" },
//     { name: "Sent to QA On" },
//     { name: "Sent to QA Remarks" },
//     { name: "QA Test Date" },
//     { name: "MATERIAL_STATUSID" },
//     { name: "QA Remarks" },
//     { name: "Analysed By" },
//     { name: "Analysed By Date" },
//     { name: "Approved By(QC)" },
//     { name: "Approved By Date(QC)" },
//     { name: "Approved By(QA)" },
//     { name: "Approved By Date(QA)" },
//     { name: "company" },
//   ];

//   return (
//     <Grid container spacing={2} alignItems="center">
//       <Grid item xs={9}>
//         <TextFieldCommon
//           onChange={() => console.log("search")}
//           type="search"
//           label="Search For"
//           color="primary"
//           fullWidth={true}
//           variant="standard"
//           name='search'
//         />
//       </Grid>
//       <Grid item xs={3}>
//         <Button
//           startIcon={<SearchIcon />}
//           sx={{
//             color: "black",
//             fontWeight: "bold",
//             boxShadow: 5,
//             fontSize: 13,
//           }}
//         >
//           search
//         </Button>
//       </Grid>
//       <Grid item xs={12}>
//         <Grid
//           container
//           component="table"
//           style={{ border: "1px solid black" }}
//         >
//           <Grid component="thead" item>
//             <Grid container component="tr" style={{ backgroundColor: "#248f8f" }}>
//               {list.map((plans, index) => (
//                 <Grid
//                   key={index}
//                   component="th"
//                   item
//                   style={{
//                     fontWeight: "bold",
//                     color: "white",
//                     fontSize: 15,
//                     maxWidth: "100%",
//                     lineHeight: 1,
//                   }}
//                 >
//                   {plans.name}
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//           <Grid component="tbody" item>
//             <Grid
//               container
//               component="tr"
//               style={{ backgroundColor: "lightGray" }}
//             >
//               {Array.from({ length: 25 }).map((_, index) => (
//                 <Grid key={index} component="td" item></Grid>
//               ))}
//             </Grid>
//             <Grid
//               container
//               component="tr"
//               style={{ backgroundColor: "lightGray" }}
//             >
//               {Array.from({ length: 25 }).map((_, index) => (
//                 <Grid key={index} component="td" item></Grid>
//               ))}
//             </Grid>
//             <Grid container component="tr">
//               {Array.from({ length: 25 }).map((_, index) => (
//                 <Grid key={index} component="td" item></Grid>
//               ))}
//             </Grid>
//             <Grid container component="tr">
//               {Array.from({ length: 25 }).map((_, index) => (
//                 <Grid key={index} component="td" item></Grid>
//               ))}
//             </Grid>
//             <Grid container component="tr">
//               {Array.from({ length: 25 }).map((_, index) => (
//                 <Grid key={index} component="td" item></Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       {/* <Grid item xs={12}></Grid>
//       <Grid item xs={12}></Grid>
//       <Grid item xs={12}></Grid> */}
//       <Grid item xs={12} sm={12} md={12} lg={12}>
//         <br />
//         <Grid container justifyContent="flex-end" spacing={2}>
//           <Grid item>
//             <Button
//               size="medium"
//               sx={{
//                 boxShadow: 4,
//                 color: "black",
//                 fontWeight: "bold",
//                 borderRadius: 1,
//               }}
//               className="cancel-btn"
//               onClick={() => onClose()}
//             >
//               Cancel
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               type="submit"
//               sx={{ fontWeight: "bold", borderRadius: 1 }}
//               variant="contained"
//               className="add-btn"
//               color="primary"
//             >
//               Select
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography>Status Message:</Typography>
//       </Grid>
//     </Grid>
//   );
// };
// export default GrnSearch;
