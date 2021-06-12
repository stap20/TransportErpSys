import React from "react";
import propTypes from "prop-types";
import Globals from "reactor/globals";
import CssBaseline from "@material-ui/core/CssBaseline";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MultiDirection from "./multi-direction";

export default function Theme(props) {
  const theme = createMuiTheme({
    direction: Globals.direction,
    palette: {
      primary: {
        main: lightBlue[800],
      },
      secondary: {
        main: "#ff835c",
      },
    },
    status: {
      dandger: "orange",
    },
  });
  return (
    <MultiDirection>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </MultiDirection>
  );
}

Theme.propTypes = {
  children: propTypes.any.isRequired,
};
