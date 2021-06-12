import React from "react";
import propTypes from "prop-types";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function MultiDirection(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

MultiDirection.propTypes = {
  children: propTypes.any.isRequired,
};
