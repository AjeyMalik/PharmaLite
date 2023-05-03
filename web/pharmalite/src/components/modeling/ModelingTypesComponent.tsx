import {
  Box,
  Grid,
  Button,
  Paper,
  Typography,
  IconButton,
  Tooltip,
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
import { IDrawerOpen } from "index/vm";
import {
  getListItemValues,
  getObjectDetails,
  getTableFieldCaptions,
  removeObjectDetails,
} from "index/services/modeling/ModelingService";
import CustomDrawerComponent from "../common/CustomDrawer";
import { ICellRendererParams } from "ag-grid-community";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmDialogContext } from "index/providers/ConfirmDialogProvider";
import ManageModelingType from "./ManageModelingType";
import moment from "moment";
import AppDatePicker from "index/shared/inputs/AppDateSelect";
import AppSelectInput from "index/shared/inputs/AppSelectInput";
import { StatusContext } from "index/providers/StatusProvider";

interface ModelingTypesComponentProps {
  type: string;
}

const ModelingTypesComponent: React.FunctionComponent<
  ModelingTypesComponentProps
> = (props) => {
  const gridRef = React.useRef<AgGridReact>(null);

  const { showConfirmDialog } = React.useContext(ConfirmDialogContext);
  const { updateStatus } = React.useContext(StatusContext);

  const [fieldCaptions, setFieldCaptions] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setColumnsDefs] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [dialog, setIsDialogOpen] = useState({
    isOpen: false,
    index: -1,
  } as IDrawerOpen);
  const [selectedItem, setSelectedItem] = useState<any>();

  const customButtonCell = (cellprops: ICellRendererParams) => {
    return (
      <span>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => handleEdit(cellprops.data, cellprops.rowIndex)}
          >
            <EditIcon color="secondary" />
          </IconButton>
        </Tooltip>{" "}
        <Tooltip title="Delete">
          <IconButton
            onClick={() => handleDelete(cellprops.data, cellprops.rowIndex)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </span>
    );
  };

  const customCell = (cellprops: ICellRendererParams) => {
    return <span>{cellprops?.value || "-"}</span>;
  };
  const customDateCell = (cellprops: ICellRendererParams) => {
    return (
      <span>
        {cellprops.value ? moment(cellprops.value).format("DD-MM-YYYY") : "-"}
      </span>
    );
  };

  const [search, setSearch] = useState<any>({});

  useEffect(() => {
    const companyName = localStorage.getItem("company");
    setCompanyName(companyName || "");
    setSearch({ company: companyName });
    const getFields = async (type: string) => {
      const result = await getTableFieldCaptions(type);
      if (result && result.errorNo == 0) {
        let fieldCaptionsList: any = [];
        result.dTable.length > 0 &&
          result.dTable.forEach(async (ele) => {
            if (ele.uireturntype === "LIST" && ele.fielD_QUERY) {
              let listsResult = await getListItemValues(ele.fielD_QUERY);
              // let listItem = formLoadData.find(
              //   (e: any) => e.columnName === ele.field_name
              // );
              if (listsResult && listsResult.errorNo === 0) {
                let tempName =
                  listsResult.columnDetails.length > 0 &&
                  listsResult.columnDetails[1].columnName &&
                  listsResult.columnDetails[1].columnName.toLowerCase();
                let tempValue =
                  listsResult.columnDetails.length > 0 &&
                  listsResult.columnDetails[0].columnName &&
                  listsResult.columnDetails[0].columnName.toLowerCase();

                let tempList =
                  listsResult.dTable.length > 0
                    ? listsResult.dTable.map((listItem) => {
                        return {
                          name: listItem[tempName],
                          value: listItem[tempValue],
                        };
                      })
                    : [];
                console.log("--list--", tempList);
                fieldCaptionsList.push({
                  ...ele,
                  field_name: ele.field_name
                    ? ele.field_name.toLowerCase()
                    : "",
                  listValues: tempList,
                });
              } else {
                updateStatus(listsResult?.resultMessage, "error");
              }
            } else {
              fieldCaptionsList.push({
                ...ele,
                field_name: ele.field_name ? ele.field_name.toLowerCase() : "",
              });
            }
          });
        console.log("fieldCaptions", fieldCaptionsList);
        setFieldCaptions(fieldCaptionsList);
        getList({}, fieldCaptionsList);
        updateStatus("", "");
      } else {
        updateStatus(result?.resultMessage, "error");
      }
    };
    getFields(props.type);
  }, [props.type]);

  const getList = async (searchObj?: any, fieldCaptionsList?: any[]) => {
    const companyName = localStorage.getItem("company");
    let obj = searchObj
      ? { ...searchObj, company: companyName || "" }
      : { ...search, company: companyName || "" };
    let result = await getObjectDetails(props.type, obj);
    let tempFieldCaptions =
      fieldCaptionsList && fieldCaptionsList.length > 0
        ? [...fieldCaptionsList]
        : [...fieldCaptions];
    let colDefs: any = [];
    tempFieldCaptions.forEach((item: any) => {
      colDefs.push({
        field: item.field_name,
        headerName: item.field_caption,
        colId: item.field_name,
        filter:
          item.field_type === "DATETIME"
            ? "agDateColumnFilter"
            : item.field_type === "NUMBER"
            ? "agNumberColumnFilter"
            : "agTextColumnFilter",
        cellRenderer:
          item.field_type === "DATETIME" ? customDateCell : customCell,
      });
    });
    colDefs.push({
      field: "button",
      headerName: "Manage",
      cellRenderer: customButtonCell,
      editable: false,
      minWidth: 150,
      colId: "params",
    });
    setColumnsDefs(colDefs);

    if (result && result.errorNo === 0) {
      let row =
        result.dTable &&
        result.dTable.length > 0 &&
        result.dTable.map((ele: any) => {
          let headers = Object.entries(ele).map((e) => e[0]);
          let itemstoReturn = headers.reduce((e, acc) => {
            return { ...e, [acc.toLowerCase()]: ele[acc] };
          }, {});
          return itemstoReturn;
        });
      console.log("columnDefs", colDefs);
      console.log("rowData", row);
      setRowData(row || []);
      // updateStatus("", "");
    } else {
      setRowData([]);
      updateStatus(result?.resultMessage, "error");
    }
  };

  const reset = () => {
    setSearch({ company: companyName });
    getList({});
  };

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      // sortable: true,
      // editable: true,
      flex: 1,
      minWidth: 160,
      minHeight: 80,
    }),
    []
  );

  const onGridReady = () => {};

  const handelAdd = () => {
    setIsDialogOpen({ index: -1, isOpen: true });
    setSelectedItem(undefined);
  };
  const handleEdit = (data: any, index: number) => {
    setSelectedItem(data);
    setIsDialogOpen({ index, isOpen: true });
  };
  const handleDelete = (data: any, index: number) => {
    showConfirmDialog("Are you sure", "Do you want to delete?", async () => {
      const result = await removeObjectDetails(props.type, data);
      if (result && result.errorNo === 0) {
        updateStatus(result?.resultMessage, "success");
        getList({});
      } else {
        updateStatus(result?.resultMessage, "error");
      }
    });
  };

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={4} component="div" sx={{ padding: 2 }}>
            <Box component="div" justifyContent="flex-start" display="flex">
              <Typography variant="h5" textTransform="capitalize">
                {props.type ? props.type.replaceAll("_", " ") : "-"}
              </Typography>
              {/* <IconButton
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {!expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}{" "}
              </IconButton> */}
            </Box>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={10} lg={10}>
                <Grid container spacing={2}>
                  {fieldCaptions.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.uireturntype === "SINGLE" &&
                        item.field_type === "STRING" && (
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              label={item.field_caption}
                              type="text"
                              disabled={item.readOnly != 0}
                              onBlur={() => {}}
                              onChange={(e: any) => {
                                let tempValue = e.target.value;
                                setSearch({
                                  ...search,
                                  [item.field_name]: tempValue || undefined,
                                });
                              }}
                              value={search[item.field_name] || ""}
                            />
                          </Grid>
                        )}
                      {item.uireturntype === "SINGLE" &&
                        item.field_type === "NUMERIC" && (
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <AppTextInput
                              label={item.field_caption}
                              type="number"
                              disabled={item.readOnly != 0}
                              onBlur={() => {}}
                              onChange={(e: any) => {
                                let tempValue = e.target.value;
                                setSearch({
                                  ...search,
                                  [item.field_name]: tempValue || undefined,
                                });
                              }}
                              value={search[item.field_name] || ""}
                            />
                          </Grid>
                        )}
                      {item.uireturntype === "SINGLE" &&
                        item.field_type === "DATETIME" && (
                          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                            <AppDatePicker
                              label={item.field_caption}
                              onBlur={() => {}}
                              disabled={item.readOnly != 0}
                              onChange={(e: any) => {
                                let tempValue = "";
                                if (e) {
                                  tempValue = moment(e).toISOString();
                                }
                                setSearch({
                                  ...search,
                                  [item.field_name]: tempValue || undefined,
                                });
                              }}
                              value={search[item.field_name] || ""}
                            />
                          </Grid>
                        )}
                      {item.uireturntype === "LIST" && (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                          <AppSelectInput
                            // menuItems={item.listValues}
                            menuItems={[
                              ...item.listValues,
                              { name: "All", value: "all" },
                            ]}
                            label={item.field_caption}
                            disabled={item.readOnly != 0}
                            onBlur={() => {}}
                            onChange={(e: any) => {
                              let tempValue = e.target.value;
                              setSearch({
                                ...search,
                                [item.field_name]:
                                  tempValue && tempValue != "all"
                                    ? tempValue
                                    : undefined,
                              });
                            }}
                            value={search[item.field_name] || "all"}
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
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
                        handelAdd();
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
            {/* </Collapse> */}
          </Paper>
        </Grid>
        <Grid item xs={12} paddingBottom={6}>
          <Paper elevation={4} component="div">
            {/* <Box
              component="div"
              padding={2}
              justifyContent="end"
              display="flex"
            >
              <Button
                variant="text"
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {!expanded ? (
                  <Typography variant="caption">Show More</Typography>
                ) : (
                  <Typography variant="caption">Show Less</Typography>
                )}
              </Button>
            </Box> */}
            {/* <Collapse in={!expanded} timeout="auto" unmountOnExit> */}
            <div
              style={{
                // height: expanded
                //   ? "calc(100vh - 225px)"
                //   : "calc(100vh - 552px)",
                height: "calc(100vh - 210px)",
              }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={[...rowData]}
                columnDefs={columnDefs}
                className="ag-theme-alpine"
                animateRows={true}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                onGridReady={onGridReady}
                context={{
                  customButtonCell,
                  customDateCell,
                  customCell,
                }}
              ></AgGridReact>
            </div>
            {/* </Collapse> */}
          </Paper>
        </Grid>
      </Grid>

      {dialog.isOpen && (
        <CustomDrawerComponent
          title={dialog.index != -1 ? "Edit" : "Add"}
          isOpen={true}
          onClose={() => {
            setIsDialogOpen({ index: -1, isOpen: false });
          }}
        >
          <ManageModelingType
            type={props.type}
            fieldCaptions={fieldCaptions}
            modelingData={selectedItem}
            onClose={(data?: any) => {
              if (data) {
                getList();
              }
              setIsDialogOpen({ index: -1, isOpen: false });
            }}
          />
        </CustomDrawerComponent>
      )}
    </React.Fragment>
  );
};

export default ModelingTypesComponent;
