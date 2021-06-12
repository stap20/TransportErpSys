const { carsUtils } = require("./code/js/cars/utils");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function get_car_type(req) {
  return await carsUtils.getCarsTypes();
}

async function login(req) {
  body = req.body;
  var user_data = {
    id: 6,
    name: "alias",
    login_code: "456",
    password: "123",
    group: {
      id: 2,
      name: "Users Group",
      permissions: [],
    },
    accessToken: makeid(12),
  };

  let login_code = body.get("login_code");
  let password = body.get("password");
  if (login_code === "123" && password === "123") {
    return {
      success: true,
      message: "Successful get data",
      result: user_data,
    };
  }

  return {
    success: false,
    message: "Doesn't exist in db",
    errors: ["Login Code or Passwoard is Incorrect"],
  };
}

const routes = {
  "/login": login,
  "/get_cars_type": get_car_type,
};

async function serverRouter(path, req) {
  if (routes.hasOwnProperty(path)) {
    return await routes[path](req);
  }

  return {
    success: false,
    message: "server route error",
    errors: ["There is no route with name " + path],
  };
}

//exports.serverRouter = serverRouter;
export default serverRouter;
