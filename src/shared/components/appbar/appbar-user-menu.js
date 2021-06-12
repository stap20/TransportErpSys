import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import "../styles/appbar.scss";
import userLogout from "modules/users/helper/user-logout";

export default function AppbarUserMenu(props) {
  let { anchorEl, menuId, isMenuOpen, handleMenuClose } = props;
  return (
    <Menu
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem onClick={() => userLogout()}>Logout</MenuItem>
    </Menu>
  );
}
