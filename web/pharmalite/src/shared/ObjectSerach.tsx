import { Grid, Typography } from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import * as React from "react";
import { useState, useEffect } from "react";
import AppTextInput from "./inputs/AppTextInput";
import { Formik } from "formik";
import AppButton from "./inputs/AppButton";
import { Search } from "@mui/icons-material";
import AppSelectInput from "./inputs/AppSelectInput";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface ObjectSearchComponentProps {
  data: any;
  onClose: Function;
}

const ObjectSearchComponent: React.FunctionComponent<
  ObjectSearchComponentProps
> = ({ data, onClose }) => {
  const gridRef = React.useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setColumnsDefs] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [statusMessage, setStatusMessage] = useState("");

  const [search, setSearch] = useState({
    searchFor: "",
    listTypeId: "",
    searchForBatchNum: "",
    searchForProduct: "",
  });

  const defaultColDef = React.useMemo(
    () => ({
      resizable: true,
      flex: 1,
      minWidth: 160,
    }),
    []
  );

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

  const onSelectionChanged = () => {
    let selectedRow = gridRef.current?.api.getSelectedRows();
    if (selectedRow && selectedRow.length > 0 && selectedRow[0]) {
      let data = selectedRow[0];
      let hiddenColumns = Object.keys(data).filter((e) => e.includes("_hide"));
      hiddenColumns.forEach((column) => {
        data[column.split("_hide")[0]] = data[column];
      });
      setSelectedItem(data);
      //   setSearch(data);
      //   setIsEdit(true);
    }
  };
  return (
    <React.Fragment>
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              {!data?.isFinistedProducts ? (
                <>
                  <Grid item xs={data?.isListData ? 4 : 9}>
                    <AppTextInput
                      label="Search For"
                      name="searchFor"
                      value={values?.searchFor}
                      fullWidth={true}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  {data?.isListData && (
                    <Grid item xs={4}>
                      <AppSelectInput
                        menuItems={[]}
                        onChange={(e: any) => {
                          let tempValue = e?.value;
                          if (!e?.value) {
                            if (e.value === 0) {
                              tempValue = 0;
                            } else {
                              tempValue = e?.value || null;
                            }
                          }
                          setFieldValue("listTypeId", tempValue);
                        }}
                        onBlur={handleBlur}
                        value={values?.listTypeId}
                        label="Type"
                        name="listTypeId"
                      />
                    </Grid>
                  )}
                  <Grid item xs={data?.isListData ? 4 : 3}>
                    <AppButton
                      startIcon={<Search />}
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        boxShadow: 5,
                        fontSize: 14,
                      }}
                      btnText="Search"
                      type="submit"
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={4}>
                    <AppTextInput
                      label="Batch Number"
                      name="searchForBatchNum"
                      value={values?.searchForBatchNum}
                      fullWidth={true}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AppTextInput
                      label="Product Id"
                      name="searchForProduct"
                      value={values?.searchForProduct}
                      fullWidth={true}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <AppButton
                      startIcon={<Search />}
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        boxShadow: 5,
                        fontSize: 13,
                      }}
                      btnText="Search"
                      type="submit"
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div
                  style={{
                    height: "calc(100vh - 444px)",
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
                    pagination={false}
                    onSelectionChanged={onSelectionChanged}
                    suppressMovableColumns={true}
                    context={{
                      // customButtonCell,
                      customDateCell,
                      customCell,
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <br />
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <AppButton
                      size="medium"
                      btnText="Cancel"
                      variant="outlined"
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
                      onClick={() => {
                        onClose(selectedItem);
                      }}
                      variant="contained"
                      className="add-btn"
                      color="primary"
                      disabled={!selectedItem}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>Status Message:{statusMessage || ""}</Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ObjectSearchComponent;
