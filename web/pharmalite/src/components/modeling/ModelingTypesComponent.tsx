import {
  Box,
  Grid,
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
  getObjectDetails,
  getTableFieldCaptions,
  getTransactionObject,
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
import Loading from "../common/Loading";
import Collapse from "@mui/material/Collapse";

interface ModelingTypesComponentProps {
  type: string;
}

const ModelingTypesComponent: React.FunctionComponent<
  ModelingTypesComponentProps
> = (props) => {
  const gridRef = React.useRef<AgGridReact>(null);

  const { showConfirmDialog } = React.useContext(ConfirmDialogContext);
  const { updateStatus } = React.useContext(StatusContext);

  const [isLoading, setLoading] = useState(false);
  const [fieldCaptions, setFieldCaptions] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setColumnsDefs] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [hideTable, setHideTable] = useState(false);
  const [dialog, setIsDialogOpen] = useState({
    isOpen: false,
    index: -1,
  } as IDrawerOpen);

  const [selectedItem, setSelectedItem] = useState<any>();

  const [isFirst, setIsFirst] = useState(true);

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
    return (
      <span>
        {cellprops?.value || cellprops?.value == 0 ? cellprops.value : "-"}
      </span>
    );
  };

  const customDateCell = (cellprops: ICellRendererParams) => {
    return (
      <span>
        {cellprops.value ? moment(cellprops.value).format("DD/MM/YYYY") : "-"}
      </span>
    );
  };

  const [search, setSearch] = useState<any>({});

  useEffect(() => {
    const companyName = localStorage.getItem("company");
    setCompanyName(companyName || "");
    setSearch({ company: companyName });
    setIsFirst(true);
    if (companyName) {
      getFields(props.type, companyName);
    }
  }, [props.type]);

  const getFields = async (type: string, company: string) => {
    setLoading(true);
    const result = await getTableFieldCaptions(type, company);
    if (result && result.errorNo == 0) {
      let fieldCaptionsList: any = [];
      let formLoadData: any = result?.formLoadData || [];

      result.dTable.length > 0 &&
        result.dTable.forEach(async (ele) => {
          if (ele.uireturntype === "LIST") {
            let listItem = formLoadData.find(
              (e: any) => e.columnName === ele.field_name
            );
            let tempList =
              listItem && listItem.columnData && listItem.columnData.length > 0
                ? listItem.columnData.map((e: any) => {
                    let itemstoReturn: any = Object.keys(e).reduce(
                      (acc, key) => {
                        return { ...acc, [key.toLowerCase()]: e[key] };
                      },
                      {}
                    );
                    return {
                      value: itemstoReturn.keyid,
                      name: itemstoReturn.keyvalue,
                    };
                  })
                : [];
            console.log("--list--", tempList);
            fieldCaptionsList.push({
              ...ele,
              field_name: ele.field_name
                ? ele.field_name &&
                  ele.field_type &&
                  ele.field_name === ele.field_type
                  ? ele.field_name.toLowerCase() + "id"
                  : ele.field_name.toLowerCase()
                : "",
              listValues: tempList || [],
            });
          } else {
            fieldCaptionsList.push({
              ...ele,
              field_name: ele.field_name ? ele.field_name.toLowerCase() : "",
            });
          }
        });
      console.log("fieldCaptions", fieldCaptionsList);
      setFieldCaptions(fieldCaptionsList);
      setLoading(false);
      updateStatus("", "");
      getList({}, fieldCaptionsList, true);
    } else {
      updateStatus(result?.resultMessage, "error");
      setLoading(false);
    }
  };

  const getList = async (
    searchObj?: any,
    fieldCaptionsList?: any[],
    isFirstLoad?: boolean
  ) => {
    const companyName = localStorage.getItem("company");
    let obj = searchObj
      ? { ...searchObj, company: companyName || "" }
      : { ...search, company: companyName || "" };
    var objectArr: string[] = [];
    Object.keys(obj).forEach(function (key) {
      objectArr.push(key);
      objectArr.push(obj[key]);
    });
    let transactionObj = await getTransactionObject(props.type, objectArr);
    if (transactionObj) {
      let result = await getObjectDetails(props.type, transactionObj);
      let tempFieldCaptions =
        fieldCaptionsList && fieldCaptionsList.length > 0
          ? [...fieldCaptionsList]
          : [...fieldCaptions];
      let colDefs: any = [];
      if (result && result.errorNo === 0) {
        result.columnDetails.forEach((item: any) => {
          if (
            item?.columnName &&
            item?.columnName.toLowerCase().includes("_hide") === false
          ) {
            let selectedFieldCation = tempFieldCaptions.find(
              (fieldCaptionItem) =>
                fieldCaptionItem.field_name === item?.columnName.toLowerCase()
            );
            colDefs.push({
              field: item.columnName.toLowerCase(),
              headerName: item.columnCaption,
              colId: item.columnName.toLowerCase(),
              filter:
                selectedFieldCation &&
                selectedFieldCation.field_type === "DATETIME"
                  ? "agDateColumnFilter"
                  : selectedFieldCation &&
                    selectedFieldCation.field_type === "NUMBER"
                  ? "agNumberColumnFilter"
                  : "agTextColumnFilter",
              cellRenderer:
                selectedFieldCation &&
                selectedFieldCation.field_type === "DATETIME"
                  ? customDateCell
                  : customCell,
            });
          }
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
        if (!isFirstLoad) {
          setRowData(row || []);
          setIsFirst(false);
        } else {
          setRowData([]);
          setIsFirst(true);
        }
      } else {
        setRowData([]);
        updateStatus(result?.resultMessage, "error");
      }
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
    }),
    []
  );

  const onGridReady = () => {};

  const handelAdd = () => {
    setIsDialogOpen({ index: -1, isOpen: true });
    setSelectedItem(undefined);
  };

  const handleEdit = (data: any, index: number) => {
    let isHideAvailable = Object.keys(data).find((e) => e.includes("_hide"));
    if (isHideAvailable) {
      data[isHideAvailable.split("_hide")[0]] = data[isHideAvailable];
    }
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
      {isLoading && <Loading />}
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={4} component="div" sx={{ padding: 2 }}>
            <Box component="div" justifyContent="space-between" display="flex">
              <Typography
                variant="h6"
                fontWeight={700}
                textTransform="capitalize"
              >
                {props.type ? props.type.replaceAll("_", " ") : "-"}
              </Typography>
              <Box component="div" display="flex" flexDirection="row">
                <AppButton
                  btnText="Search"
                  onClick={() => {
                    getList();
                  }}
                  startIcon={<SearchIcon />}
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                />
                <AppButton
                  btnText="Reset"
                  onClick={() => {
                    reset();
                  }}
                  startIcon={<ReplayIcon />}
                  type="rest"
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  className="ml-2"
                />
                <AppButton
                  btnText="Add"
                  onClick={() => {
                    handelAdd();
                  }}
                  startIcon={<AddIcon />}
                  type="button"
                  variant="contained"
                  color="secondary"
                  fullWidth={true}
                  className="ml-2"
                />
              </Box>
            </Box>
            <br />
            <Box sx={{ height: hideTable?"calc(100vh - 290px)":"210px", overflow: "auto", padding: "0 24px" }}>
              <Grid container spacing={1}>
                {fieldCaptions.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.uireturntype === "SINGLE" &&
                      item.field_type === "STRING" && (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <AppTextInput
                            label={item.field_caption}
                            type="text"
                            required={item.userrequired != 0}
                            encrypted={item.encrypted !== 0}
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
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <AppTextInput
                            label={item.field_caption}
                            type="number"
                            required={item.userrequired != 0}
                            encrypted={item.encrypted !== 0}
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
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                          <AppDatePicker
                            label={item.field_caption}
                            onBlur={() => {}}
                            required={item.userrequired != 0}
                            encrypted={item.encrypted !== 0}
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
                      <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <AppSelectInput
                          menuItems={[
                            { name: "All", value: "all" },
                            ...item.listValues,
                          ]}
                          label={item.field_caption}
                          required={item.userrequired != 0}
                          encrypted={item.encrypted !== 0}
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
              </Grid>{" "}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} paddingBottom={6}>
          <Paper elevation={4} component="div" sx={{ padding: 2 }}>
            <Box component="div" display="flex">
              <Typography
                variant="subtitle2"
                component="a"
                color="primary"
                onClick={() => {
                  setHideTable(!hideTable);
                }}
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {!hideTable ? "Hide" : "Show"}
              </Typography>
            </Box>
            <Collapse in={!hideTable}>
              <div
                style={{
                  height: "calc(100vh - 500px)",
                }}
              >
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  className="custom-grid ag-theme-alpine"
                  rowSelection="single"
                  rowHeight={36}
                  animateRows={true}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={10}
                  onGridReady={onGridReady}
                  suppressMovableColumns={true}
                  overlayNoRowsTemplate={
                    isFirst
                      ? "Please Search To Load The Data"
                      : "No Rows To Show"
                  }
                  context={{
                    customButtonCell,
                    customDateCell,
                    customCell,
                  }}
                ></AgGridReact>
              </div>
            </Collapse>
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
