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
  import TextFieldCommon from "../common/TextFieldCommon";
  import SearchIcon from "@mui/icons-material/Search";
  
  interface MaterialProps {
    onClose: Function;
  }
  const MaterialSearch: React.FunctionComponent<MaterialProps> = ({ onClose }) => {
    const list = [
      { name: "MATERIAL_MASTERID" },
      { name: "MODIFIEDBY" },
      { name: "MODIFIEDON" },
      { name: "STATUS" },
      { name: "PARENTID" },
      { name: "Name" },
      { name: "Description" },
      { name: "UOMID" },
      { name: "MATERIAL_TYPEID" },
      { name: "Company" },
    ];
  
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
            name='search'
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
            <Table style={{ border: "1px solid black" }} >
              <TableHead style={{ backgroundColor: "#248f8f" }}>
                <TableRow>
                  {list.map((plans) => (
                    <TableCell key={''}>
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
                <TableRow style={{ backgroundColor: "lightGray" }}>
                  {Array.from({ length: list.length }).map((_, index) => (
                    <TableCell key={index}></TableCell>
                  ))}
                </TableRow>
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
              <Button
                size="medium"
                sx={{
                  boxShadow: 4,
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: 1,
                }}
                className="cancel-btn"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                sx={{ fontWeight: "bold", borderRadius: 1 }}
                variant="contained"
                className="add-btn"
                color="primary"
              >
                Select
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography>Status Message:</Typography>
        </Grid>
      </Grid>
    );
  };
  export default MaterialSearch;
  