import React from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core";
import Tooltip from "reactor/components/tooltip";

const CustomColorSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.secondary.main,
    "& + $track": {
      backgroundColor: theme.palette.secondary.main,
      opacity: 0.5,
    },
    "&$checked": {
      color: theme.palette.primary.main,
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  checked: {},
  track: {},
}))(Switch);

export default function CustomeSwitch(props) {
  let { firstLabel, lastLabel, checked, onChange, name } = props;

  let activeColorStyle = { opacity: "1", fontWeight: "700" };
  let passiveColorStyle = { opacity: "0.5" };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-start">
        <div
          className="pt-2"
          hidden={firstLabel === "" || firstLabel === undefined ? true : false}
        >
          <p style={!checked ? activeColorStyle : passiveColorStyle}>
            {firstLabel}
          </p>
        </div>
        <div>
          <CustomColorSwitch
            checked={checked}
            onChange={onChange}
            name={name}
          />
        </div>
        <div
          className="pt-2"
          hidden={lastLabel === "" || lastLabel === undefined ? true : false}
        >
          <p style={checked ? activeColorStyle : passiveColorStyle}>
            {lastLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
