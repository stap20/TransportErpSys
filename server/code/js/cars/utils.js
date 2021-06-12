const { queryMaker } = require("../db/db_layer");

const carsUtils = {
  async getCarsTypes() {
    const table_name = "car_type";

    // check if user exist data in data base
    var get_cars_type_query = await queryMaker.getallData(table_name, {}, {});

    if (get_cars_type_query == null) {
      return {
        result: null,
        details: {
          success: false,
          message: "Doesn't exist in db",
          errors: ["Input Error For Cars Type Table"],
        },
      };
    } else if (get_cars_type_query) {
      return {
        success: true,
        message: "Successful get data",
        result: get_cars_type_query,
      };
    }
  },
};

exports.carsUtils = carsUtils;
