import { Box, Button, Paper, Typography } from "@mui/material";
import * as styles from "./Homepage.styles";
import { buttonsContainer } from "./Homepage.styles";
import { Link } from "react-router-dom";
import { CenteredLayout } from "../../components/centeredLayout/CenteredLayout";

export const Homepage = () => {
  return (
    <CenteredLayout>
      <Paper sx={styles.container}>
        <Box sx={styles.textCentered}>
          <Typography variant="h1">Meteo Analytics</Typography>
        </Box>
        <Box sx={styles.buttonsContainer}>
          <Button
            component={Link}
            to="/report-form"
            variant="contained"
            size="large"
          >
            Report Form
          </Button>
          <Button
            component={Link}
            to="/report-list"
            variant="contained"
            size="large"
          >
            Report List
          </Button>
        </Box>
      </Paper>
    </CenteredLayout>
  );
};
