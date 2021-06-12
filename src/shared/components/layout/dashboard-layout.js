import React from "react";
import "../styles/dashboard.scss";
import propTypes from "prop-types";
import Layout from "./layout";
import PrimarySearchAppBar from "../appbar/appbar";
import Sidebar from "../sidebar/sidebar";
import layoutSettings from "../layout-settings";
import Globals from "reactor/globals";
import { getCurrentLocaleCode } from "reactor/localization/locales";

export default function DashboardLayout(props) {
  const classes = layoutSettings();
  const [open, setOpen] = React.useState(true);
  const [sidebarWidth, setSidebarWidth] = React.useState("col-2");
  const handleDrawer = () => {
    if (open) {
      setSidebarWidth("col-1");
    } else {
      setSidebarWidth("col-2");
    }
    setOpen(!open);
  };

  return (
    <Layout>
      <div className="container-fluid d-flex h-100 flex-column items-center">
        <div className="row dashboard-full-screen">
          <div
            className={
              sidebarWidth +
              " " +
              "d-none d-lg-block pl-2 pr-2 side-bar-background-image-style"
            }
          >
            <Sidebar open={open} />
          </div>
          <div className="col pl-0 pr-0">
            <div className="container-fluid d-flex h-100 flex-column items-center">
              <div className="row" style={{ backgroundColor: "blue" }}>
                <div className="col p-0">
                  <PrimarySearchAppBar
                    currentLocaleCode={getCurrentLocaleCode()}
                    onClick={handleDrawer}
                  />
                </div>
              </div>
              <div className="row flex-fill d-flex mb-4">
                <div className="col pt-4 pl-3 pr-3">
                  <main>
                    <div className="container-fluid">{props.children}</div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

DashboardLayout.propTypes = {
  children: propTypes.any.isRequired,
};

{
  /* <div className="container-fluid min-h-full-screen">
<div className="row min-h-full-screen">
  <div className="col-2" style={{ backgroundColor: "red" }}>
    <Sidebar open={open} onClose={handleDrawerClose} />
  </div>
  <div className="col">
    <div className="row" style={{ backgroundColor: "blue" }}>
      asd
    </div>
    <div
      className="row min-h-full-screen"
      style={{ backgroundColor: "green" }}
    >
      asdasd
    </div>
  </div>
</div>
</div> */
}

{
  /* <div className={classes.root}>
<Header sidebarIsOpened={open} onClick={handleDrawer} />
<Sidebar open={open} />
<main
  className={clsx(classes.content, {
    [classes.contentShift]: open,
  })}
>
  <div className={classes.drawerHeader} />

  {props.children}
</main>
</div> */
}
