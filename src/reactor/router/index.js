import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes-handler";
import { addRouter } from "./routes-list";
import initiateNavigator from "./navigator";
export {
  navigateTo,
  switchLang,
  refresh,
  currentRoute,
} from "./navigator";

/**
 * Scan the entire routes list
 *
 * @returns  {void}
 */
function scan() {
  initiateNavigator();
  ReactDOM.render(<Routes />, document.getElementById("root"));
}

export default {
  scan,
  provider: {
    name: "route", // the name that will be used from the reactor object in any module service provider,
    call: addRouter,
  },
};
