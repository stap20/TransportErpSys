import { Server, Model, Response } from "miragejs";

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

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", {
        id: 1,
        name: "Bob",
        login_code: "123",
        password: "123",
        group: {
          id: 1,
          name: "Users Group",
          permissions: [],
        },
        accessToken: makeid(12),
      });
      server.create("user", {
        id: 2,
        name: "alias",
        login_code: "456",
        password: "123",
        group: {
          id: 2,
          name: "Users Group",
          permissions: [],
        },
        accessToken: makeid(12),
      });
      server.create("user", {
        id: 3,
        name: "alias",
        login_code: "456",
        password: "123",
        group: {
          id: 2,
          name: "Users Group",
          permissions: [],
        },
        accessToken: makeid(12),
      });
      server.create("user", {
        id: 4,
        name: "alias",
        login_code: "456",
        password: "123",
        group: {
          id: 2,
          name: "Users Group",
          permissions: [],
        },
        accessToken: makeid(12),
      });
      server.create("user", {
        id: 5,
        name: "alias",
        login_code: "456",
        password: "123",
        group: {
          id: 2,
          name: "Users Group",
          permissions: [],
        },
        accessToken: makeid(12),
      });
      server.create("user", {
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
      });
      server.create("user", {
        id: 7,
        name: "alias",
        login_code: "456",
        password: "123",
        group: {
          id: 2,
          name: "Users Group",
          permissions: [],
        },
        accessToken: makeid(12),
      });
    },

    routes() {
      this.namespace = "api";

      this.post("/login", function (schema, request) {
        let formdata = request.requestBody;

        let login_code = formdata.get("login_code");
        let password = formdata.get("password");
        var res = {};
        if (login_code === "123" && password === "123") {
          res.success = true;
          res.result = schema.users.findBy({ login_code: "123" });
          return res;
        }
        res.success = false;
        res.errors = ["email or password inncorrect"];
        return res;
      });

      this.get("/users", (schema) => {
        let data = schema.users.all().models;
        let res = {
          records: data,
        };
        return res;
      });

      this.get("/logout", (schema) => {
        let res = {
          success: true,
          message: "Successful Logged Out",
        };
        return res;
      });
    },
  });

  return server;
}
