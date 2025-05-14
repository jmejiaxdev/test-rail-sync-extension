import { css } from "@emotion/react";
import { Box, styled } from "@mui/material";

export const LoadingContainer = styled(Box)(
  () => css`
    align-items: center;
    justify-content: center;
    display: flex;
    height: 100vh;
  `,
);
