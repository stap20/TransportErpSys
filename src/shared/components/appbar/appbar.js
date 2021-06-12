import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "../styles/appbar.scss";
import AppbarUserMenu from "./appbar-user-menu";
import { Public, Refresh } from "@material-ui/icons";
import Tooltip from "reactor/components/tooltip";
import { refresh, switchLang } from "reactor/router";
import { getCurrentLocaleCode } from "reactor/localization/locales";
import { trans } from "reactor/localization";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "17ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

// const localeCodesList = localeCodes.map((localeCode) => {
//   return {
//     label: trans(localeCode),
//     value: localeCode,
//   };
// });

// config.set("currentLocaleIdx", 0);

export default function PrimarySearchAppBar(props) {
  let { onClick } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [appbar_backcolor, setappbarBackcolor] = React.useState(
    "appbar-backcolor"
  );

  const TriggerLocale = () => {
    let next_language = getCurrentLocaleCode() === "en" ? "ar" : "en";
    switchLang(next_language);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (
    (props.currentLocaleCode === "en"
      ? "appbar-backcolor"
      : "appbar-backcolor-rtl") !== appbar_backcolor
  ) {
    setappbarBackcolor(
      props.currentLocaleCode === "en"
        ? "appbar-backcolor"
        : "appbar-backcolor-rtl"
    );
  }

  const menuId = "primary-search-account-menu";

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={"col p-0 " + appbar_backcolor}>
          <AppBar position="static">
            <Toolbar>
              <div className="container-fluid">
                <div className="row">
                  <div className="col d-flex justify-content-start">
                    <div className="d-flex align-items-center">
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onClick}
                      >
                        <MenuIcon />
                      </IconButton>
                    </div>
                    <div className="d-flex align-items-center ml-2">
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder={trans("search") + "...."}
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ "aria-label": "search" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-3 d-flex justify-content-end">
                    <IconButton color="inherit" onClick={() => refresh()}>
                      <Refresh />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => TriggerLocale()}>
                        <Public />
                    </IconButton>
                    <IconButton color="inherit">
                      <Badge
                        badgeContent={2}
                        color="secondary"
                        className="notification-badge-font"
                      >
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Toolbar>
            <AppbarUserMenu
              anchorEl={anchorEl}
              menuId={menuId}
              isMenuOpen={isMenuOpen}
              handleMenuClose={handleMenuClose}
            />
          </AppBar>
        </div>
      </div>
    </div>
  );
}
