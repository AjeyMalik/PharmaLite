import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import AppButton from "index/shared/inputs/AppButton";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import AddIcon from "@mui/icons-material/Add";
import AppTextInput from "index/shared/inputs/AppTextInput";
import { IModelingSearch } from "index/vm";
import { getObjectDetails } from "index/services/modeling/ModelingService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CustomDrawerComponent from "../common/CustomDrawer";

interface ModelingTypesComponentProps {
  type: string;
}

const ModelingTypesComponent: React.FunctionComponent<
  ModelingTypesComponentProps
> = (props) => {
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setColumnsDefs] = useState<
    { field: string; headerName: string }[]
  >([]);
  const [companyName, setCompanyName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    {} as {
      data: {
        title?: string;
        object?: any;
      };
    }
  );

  const [search, setSearch] = useState<IModelingSearch>({});

  useEffect(() => {
    const companyName = localStorage.getItem("company");
    setCompanyName(companyName || "");
    getList();
  }, []);

  const getList = async (searchObj?: IModelingSearch) => {
    const companyName = localStorage.getItem("company");
    let obj = searchObj
      ? { ...searchObj, Company: companyName || "" }
      : { ...search, Company: companyName || "" };
    let result = await getObjectDetails(props.type, obj);
    if (result && result.columnDetails) {
      let colDefs = result.columnDetails.map((item) => {
        return {
          field: item.columnName && item.columnName.toLowerCase(),
          headerName: item.columnCaption,
        };
      });
      setColumnsDefs(colDefs);
    }
    let row =
      result &&
      result.dTable &&
      result.dTable.length > 0 &&
      result.dTable.map((ele: any) => {
        let headers = Object.entries(ele).map((e) => e[0]);
        let itemstoReturn = headers.reduce((e, acc) => {
          return { ...e, [acc.toLowerCase()]: ele[acc] };
        }, {});
        console.log("rowdata", itemstoReturn);
        return itemstoReturn;
      });
    setRowData(row || []);
  };

  const reset = () => {
    setSearch({});
    getList({});
  };

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      // editable: true,
      flex: 1,
    }),
    []
  );

  const onGridReady = () => {
    // getList();
  };

  const addNew = () => {
    setIsDialogOpen(true);
  };

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={4} component="div" sx={{ padding: 2 }}>
            <Box component="div" justifyContent="space-between" display="flex">
              <Typography variant="h5" textTransform="capitalize">
                {props.type}
              </Typography>
              <IconButton
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {!expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}{" "}
              </IconButton>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <AppTextInput
                        label="Name"
                        onBlur={() => {}}
                        onChange={(e: any) => {
                          let tempValue = e.target.value;
                          setSearch({
                            ...search,
                            name: tempValue || undefined,
                          });
                        }}
                        value={search.name || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <AppTextInput
                        label="BOM ID"
                        onBlur={() => {}}
                        onChange={(e: any) => {
                          let tempValue = e.target.value;
                          setSearch({
                            ...search,
                            BOMID: tempValue || undefined,
                          });
                        }}
                        value={search.BOMID || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <AppTextInput
                        label="Revision"
                        onBlur={() => {}}
                        onChange={(e: any) => {
                          let tempValue = e.target.value;
                          setSearch({
                            ...search,
                            revision: tempValue || undefined,
                          });
                        }}
                        value={search.revision || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <AppTextInput
                        label="Batch Size"
                        type="number"
                        onBlur={() => {}}
                        onChange={(e: any) => {
                          let tempValue = e.target.value;
                          setSearch({
                            ...search,
                            batcH_SIZE: tempValue || undefined,
                          });
                        }}
                        value={search.batcH_SIZE || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <AppTextInput
                        label="BOM Status ID"
                        onBlur={() => {}}
                        onChange={(e: any) => {
                          let tempValue = e.target.value;
                          setSearch({
                            ...search,
                            boM_STATUSID: tempValue || undefined,
                          });
                        }}
                        value={search.boM_STATUSID || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <AppTextInput
                        label="Order Status ID"
                        onBlur={() => {}}
                        onChange={(e: any) => {
                          let tempValue = e.target.value;
                          setSearch({
                            ...search,
                            ordeR_STATUSID: tempValue || undefined,
                          });
                        }}
                        value={search.ordeR_STATUSID || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <AppTextInput
                        label="Company*"
                        disabled={true}
                        onBlur={() => {}}
                        onChange={(e: any) => {}}
                        value={companyName || ""}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4} sm={4} md={12} lg={12}>
                      <AppButton
                        btnText="Search"
                        onClick={() => {
                          getList();
                        }}
                        startIcon={<SearchIcon />}
                        type="button"
                        variant="contained"
                        color="primary"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4} md={12} lg={12}>
                      <AppButton
                        btnText="Reset"
                        onClick={() => {
                          reset();
                        }}
                        startIcon={<ReplayIcon />}
                        type="rest"
                        variant="outlined"
                        color="primary"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4} md={12} lg={12}>
                      <AppButton
                        btnText="Add"
                        onClick={() => {
                          addNew();
                        }}
                        startIcon={<AddIcon />}
                        type="button"
                        variant="contained"
                        color="secondary"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={12} paddingBottom={6}>
          <Paper elevation={4} component="div">
            <Box
              component="div"
              padding={2}
              justifyContent="end"
              display="flex"
            >
              <IconButton
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}{" "}
              </IconButton>
            </Box>
            <Collapse in={!expanded} timeout="auto" unmountOnExit>
              <div style={{ height: 400 }}>
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  className="ag-theme-alpine"
                  animateRows={true}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={10}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </Collapse>
          </Paper>
        </Grid>
      </Grid>

      {isDialogOpen && (
        <CustomDrawerComponent
          title={selectedItem?.data?.title || "Add"}
          isOpen={true}
          onClose={() => {
            setIsDialogOpen(false);
          }}
        >
          test
        </CustomDrawerComponent>
      )}
    </React.Fragment>
  );
};

export default ModelingTypesComponent;
