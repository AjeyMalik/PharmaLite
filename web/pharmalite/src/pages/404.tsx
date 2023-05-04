import { Box, Fab, Paper, Typography } from "@mui/material";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

const MyLink = (props: any) => <Link href="/dashboard" {...props} />;

export default function PageNotFound() {
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Paper
          sx={{
            textAlign: "center",
            padding: 4,
            width: "400px",
            margin: "16px auto",
          }}
        >
          <Typography variant="h3" gutterBottom>
            4
            <span role="img" aria-labelledby="lost" style={{ color: "red" }}>
              🚫
            </span>
            4
          </Typography>
          <Typography variant="h5" gutterBottom>
            Looks like you are stranded... Lets go home
          </Typography>
          <br />
          <Fab color="primary" aria-label="home" component={MyLink}>
            <HomeIcon />
          </Fab>
        </Paper>
      </Box>
    </React.Fragment>
  );
}
