import { Card, CardContent, Grid, Typography } from "@mui/material";
import { SideMenuManageContext } from "index/providers/SideMenuManageProvider";
import { StatusContext } from "index/providers/StatusProvider";
import * as React from "react";

const DASHBOARD_ITEMS = [
  { name: "Modeling", key: "Modeling" },
  { name: "Inventory Management", key: "Inventory Management" },
  { name: "Manufacturing", key: "Manufacturing" },
  { name: "Quality", key: "Quality Assurance" },
  { name: "Plant Maintenance", key: "Plant Maintenance" },
  { name: "Transaction Administrator", key: "Transaction Administrator" },
];

interface DashboardComponentProps {}

const DashboardComponent: React.FunctionComponent<
  DashboardComponentProps
> = () => {
  //to use status bar
  const { updateStatus } = React.useContext(StatusContext);
  const { updateOpenStats, updateSelectedMenuGroup } = React.useContext(SideMenuManageContext);

  const onCardClick = (item: string) => {
    localStorage.setItem("selectedMenuGroup", item);
    updateSelectedMenuGroup(item);
    updateOpenStats(true);
  };

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <Grid item xs={8} sm={8} md={8} lg={8}>
          <Grid container spacing={2}>
            {DASHBOARD_ITEMS.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
                <Card
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    onCardClick(item.key);
                  }}
                >
                  <CardContent
                    sx={{
                      background: "linear-gradient(to right, #2a5298, #1e3c72)",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      height: "180px",
                      display: "flex",
                    }}
                  >
                    <Typography variant="h5" textAlign="center">
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DashboardComponent;
