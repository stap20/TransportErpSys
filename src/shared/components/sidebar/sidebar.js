import React from "react";
import "../styles/sidebar.scss";
import { navigateTo } from "reactor/router";
import { useTheme } from "@material-ui/core/styles";
import layoutSettings from "../layout-settings";
import logo from "../../../resources/logo.png";
import {
  AssessmentOutlined,
  AssignmentOutlined,
  BuildOutlined,
  NewReleasesOutlined,
} from "@material-ui/icons";

import SidebarItem from "./sidebar-item";
import config from "reactor/config";
import { trans } from "reactor/localization";

config.set("activeId", 0);

export default function Sidebar(props) {
  let { open } = props;
  const theme = useTheme();
  const classes = layoutSettings();

  const handleActive = (id, route) => {
    config.set("activeId", id);
    //navigateTo(route);
  };
  return (
    <div className="container d-flex h-100 flex-column items-center">
      <div className="row mt-1 mb-4">
        <div className="col pt-3 p-0">
          <div className={open === true ? "row pl-md-3 pr-md-3" : "row p-0"}>
            <img
              src={logo}
              className="col rounded img-fluid side-bar-logo-image-style"
            />
          </div>
        </div>
      </div>
      <div className="row flex-fill d-flex mt-2">
        <div className="col p-0">
          <SidebarItem
            btnIcon={
              <AssessmentOutlined
                className="align-middle"
                style={{ fontSize: "1.5em" }}
              />
            }
            btnText={trans("dashboard")}
            id={0}
            onClick={handleActive}
            open={open}
            route={"/"}
          />
          <SidebarItem
            btnIcon={
              <NewReleasesOutlined
                className="align-middle"
                style={{ fontSize: "1.5em" }}
              />
            }
            btnText={trans("malfunction")}
            id={1}
            onClick={handleActive}
            open={open}
            route={"/users"}
          />
          <SidebarItem
            btnIcon={
              <BuildOutlined
                className="align-middle"
                style={{ fontSize: "1.5em" }}
              />
            }
            btnText={trans("maintenance")}
            id={2}
            onClick={handleActive}
            open={open}
            route={"/users2"}
          />
          <SidebarItem
            btnIcon={
              <AssignmentOutlined
                className="align-middle"
                style={{ fontSize: "1.5em" }}
              />
            }
            btnText={trans("reports")}
            id={3}
            onClick={handleActive}
            open={open}
            route={"/users3"}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * ff5704
 */
