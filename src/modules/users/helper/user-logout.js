import { logout } from "../services/auth";
import { navigateTo } from "reactor/router";
import user from "user";

export default function userLogout() {
  //logout from the server
  //logout(); //so far no user logout from server

  setTimeout(() => {
    //clear user logout from cache >> clear the access token
    user.logout();

    //navigate to login page
    navigateTo("/login");
  }, 0);
}
