import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingContainer } from "./loading.styles";

export function Loading() {
  return (
    <LoadingContainer>
      <CircularProgress size="25px" color="secondary" />
    </LoadingContainer>
  );
}
