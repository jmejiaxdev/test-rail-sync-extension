import React, { JSX } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ErrorBoundary } from "../errorBoundary/errorBoundary.component";
import { WebviewProvider } from "../../contexts/webview/webview.provider";
import { Router } from "../router/router.component";

export function App(): JSX.Element {
  const darkTheme = createTheme({
    palette: { mode: "dark" },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            padding: "8px",
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          color: "#9e9e9e",
        },
      },
    },
  });

  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <WebviewProvider>
          <Router />
        </WebviewProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
