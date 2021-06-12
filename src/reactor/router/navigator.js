import history from "./router-history";
import { ltrim } from "reinforcements";
import {
  getCurrentLocaleCode,
  localeCodes,
  updateCurrentLocaleCode,
} from "../localization/locales";

import { updateGlobalLocaleCode } from "reactor/globals";

/**
 * Set the full current route and the current route without the locale code
 *
 * @param   {string} route
 * @returns {void}
 */
function updateCurrentRoute(route) {
  // /en/users
  currentFullRoute = route;

  // remove any possible locale code
  let regex = new RegExp(`^/(${localeCodes.join("|")})`);
  // let regex = new RegExp('^/(en|ar)')

  currentRouteWithoutLocaleCode = currentFullRoute.replace(
    regex,
    function (matched, localeCode) {
      updateCurrentLocaleCode(localeCode);
      return "";
    }
  );
}

/**
 * navigate to the given path
 *
 * @param {string} path
 */
export function navigateTo(path) {
  history.push(path);
}

/**
 * Get current route
 *
 * @returns {string}
 */
export function fullRoute() {
  return history.location.pathname;
}

/**
 * Get the route without the locale code
 *
 * @returns  {string}
 */
export function currentRoute() {
  return ltrim(fullRoute(), "/" + getCurrentLocaleCode());
}

/**
 * Force reload current route content
 *
 * @returns {void}
 */
export function refresh() {
  navigateTo(fullRoute());
}

/**
 * Navigate to current location and switch language
 *
 * @param  {string} localeCode
 */
export function switchLang(localeCode) {
  let route = currentRoute();

  updateCurrentLocaleCode(localeCode);
  updateGlobalLocaleCode(localeCode);

  navigateTo("/" + localeCode + route);
}

let currentFullRoute, currentRouteWithoutLocaleCode;

/**
 * Initialize Navigator
 */
export default function initiateNavigator() {
  /**
   * Listen to any router navigation to update current full route
   * and current route without locale codes
   */
  history.listen((location) => {
    updateCurrentRoute(location.pathname);
  });

  updateCurrentRoute(history.location.pathname || "/");
}

/**
 * Check if current route has a locale code
 * By comparing the currentFullRoute with currentRouteWithoutLocaleCode
 *
 * @returns  {boolean}
 */
export function hasInitialLocaleCode() {
  return currentFullRoute !== currentRouteWithoutLocaleCode;
}
