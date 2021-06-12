// const { serverRouter } = require("./server");

// serverRouter("/get_cars_type").then((res) => {
//   console.log(res);
// });

var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

// Create connection to database
var config = {
  server: "LAPTOP-3N1UDPQB",
  authentication: {
    type: "default",
    options: {
      userName: "sa", // update me
      password: "123", // update me
    },
  },
  port: 1433,
  //database: "master",
  trustServerCertificate: true,
};
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

connection.connect();
