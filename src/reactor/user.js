import cache from "reactor/cache";
class User {
  constructor() {
    this.userData = cache.get("user");
  }

  /**
   * check if user logged in
   *
   * @return {boolean}
   */
  isLoggedIn() {
    return this.userData != null;
  }

  /**
   * Log the user in
   * it will store the data in storage engine i.e local storage
   * but will not make ajax request
   *
   * @param {object} userData
   * @return {void}
   */
  login(userData) {
    this.userData = userData;
    cache.set("user", userData);
  }

  /**
   * Log the user out
   */
  logout() {
    this.userData = null;
    cache.remove("user");
  }

  /**
   * Get user access token
   *
   * @returns {string}
   */
  getAccessToken() {
    return this.userData.accessToken;
  }
}

export default new User();
