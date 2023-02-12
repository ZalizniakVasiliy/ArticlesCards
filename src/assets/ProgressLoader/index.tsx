import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from '../../pages/HomePage/style.module.scss';

export default function CircularIndeterminate() {
  return (
    <Box className={styles.loaderDataBox}
    >
      <CircularProgress
        color="success"
        style={{width: "100px", height: "100px"}}
      />
    </Box>
  );
}
