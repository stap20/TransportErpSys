import RestfulEndpoint from "reactor/restful-endpoint";

class UserService extends RestfulEndpoint {
  route = "/users";
}

export default new UserService();
