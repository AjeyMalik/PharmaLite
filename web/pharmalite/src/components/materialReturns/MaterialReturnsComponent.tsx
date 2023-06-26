import { Card, Grid, Typography } from "@mui/material";

interface MaterialReturnsComponentProps {}

const MaterialReturnComponent: React.FunctionComponent<
  MaterialReturnsComponentProps
> = () => {
  return (
    <>
      <Typography fontWeight="bold">Material Returns</Typography>
      <Card>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
            <Grid item>
              <Typography>Material Returns</Typography>
            </Grid>
            <Grid item>
              <Typography>Work Order</Typography>
            </Grid>
            <Grid item>
              <Typography>Others</Typography>
            </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Card>
    </>
  );
};

export default MaterialReturnComponent;
