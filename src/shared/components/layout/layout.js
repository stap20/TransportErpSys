import React from "react";
import propTypes from "prop-types";
import Theme from "./theme";

export default function Layout(props) {
  return <Theme {...props} />;
}

Layout.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]).isRequired,
};
