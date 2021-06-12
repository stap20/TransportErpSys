/*
 * this file contain general query for database so u can use it for any table ex:
 * func getalldata if u wanna get all data from table query must be like that select * from tabel_name where condition
 * so if u see func getalldata param (table,values,condition) , values that mean column name "values u want get from table"
 * so it must make it easier for dev on back end so he wont need to to write queryonly call func that make a funcationality
 * that he want like get data or select or insert or modifi or join so u want only to pass generall params
 * and return result of the quirey
 */

const mssql = require("mssql");
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const async = require("async");

const { generate } = require("./helper/query_generator");

const db_config = {
  user: "sa",
  password: "123",
  driver: "tedious",
  server: "LAPTOP-3N1UDPQB\\SA",
  database: "TRANSPORT_SYSTEM",
  port: 5000,
};

async function runQuery(query) {
  const conn = await mssql.connect(db_config);
  const res = await conn.request().query(query);
  conn.close();

  return res;
}

function checkFoundData(res) {
  if (res.rowsAffected[0] > 0) {
    return true;
  } else {
    return false;
  }
}

const queryMaker = {
  async insert(table, values) {
    values_list = typeof values_list === "undefined" ? {} : values_list;

    const options = {
      query_type: "insert",
      query_table: table,
      values_list: values,
    };

    try {
      const res = await runQuery(generate.query(options));
      if (checkFoundData(res)) return true;
      else return false;
    } catch (error) {
      return error;
    }
  },

  async isExist(table, condition) {
    const options = {
      query_type: "select",
      query_table: table,
      condition: condition,
    };

    try {
      const res = await runQuery(generate.query(options));

      if (checkFoundData(res)) return true;
      else return false;
    } catch (error) {
      //for all catch must send to class to classifi error to get useful details about error
      return error;
    }
  },

  async getData(table, values, condition) {
    values_list = typeof values_list === "undefined" ? {} : values_list;
    condition = typeof condition === "undefined" ? {} : condition;

    const options = {
      query_type: "select",
      query_table: table,
      values_list: values,
      condition: condition,
    };

    try {
      const res = await runQuery(generate.query(options));
      if (checkFoundData(res)) return res.recordset[0];
      else return null;
    } catch (error) {
      return error;
    }
  },

  async getallData(table, values, condition, sort) {
    values_list = typeof values_list === "undefined" ? {} : values_list;
    condition = typeof condition === "undefined" ? {} : condition;

    const options = {
      query_type: "select",
      query_table: table,
      values_list: values,
      condition: condition,
      sort: sort,
    };
    try {
      const res = await runQuery(generate.query(options));
      if (checkFoundData(res)) return res.recordset;
      else return null;
    } catch (error) {
      return error;
    }
  },

  async modifiData(table, condition, modifiers) {
    const options = {
      query_type: "update",
      query_table: table,
      condition: condition,
      modifiers: modifiers,
    };

    try {
      const res = await runQuery(generate.query(options));
      if (checkFoundData(res)) return true;
      else return false;
    } catch (error) {
      return error;
    }
  },

  async search(table, values, condition) {
    values_list = typeof values_list === "undefined" ? {} : values_list;
    condition = typeof condition === "undefined" ? {} : condition;

    for (i = 0; i < Object.keys(condition).length; i++) {
      condition[Object.keys(condition)[i]] =
        condition[Object.keys(condition)[i]] + "%";
    }

    const options = {
      query_type: "select",
      query_table: table,
      values_list: values,
      condition: condition,
    };

    var main_query = generate.query(options);

    for (i = 0; i < Object.keys(condition).length; i++) {
      const pos = main_query.search("=");
      main_query = [
        main_query.slice(0, pos),
        "like N",
        main_query.slice(pos + 1),
      ].join(""); //make query with 2 join
    }

    try {
      const res = await runQuery(main_query);
      if (checkFoundData(res)) return res.recordset;
      else return null;
    } catch (error) {
      return error;
    }
  },

  async search_mixed(queries_list, type, condition) {
    //disabled so far to convert it
    // assert(typeof condition !== "undefined", "condition cannot be undifined");
    // for (i = 0; i < Object.keys(condition).length; i++) {
    //   condition[Object.keys(condition)[i]] =
    //     condition[Object.keys(condition)[i]] + "%";
    // }
    // //queries is array of queris data
    // //type like 'union' | 'intersect' | 'except'
    // son = {
    //   query_type: type,
    //   queries: queries_list,
    // };
    // //get mix query => query contin relation 'union' | 'intersect' | 'except' between queries
    // mix_query = mix_queryGenerator(son);
    // //remove simicolone form end of query text
    // mix_query.text = query.text.substring(0, mix_query.text.length - 1);
    // mix_query_text = "with mix as (" + query.text + ")";
    // mix_query_values = mix_query.values;
    // //search query like select mix from t1 where name ilike '%%'
    // search_query = queryGenerator({
    //   query_type: "select",
    //   query_table: "mix",
    //   values_list: {},
    //   condition: condition,
    // });
    // //here convert = to ilike and $number => to $valid number
    // for (i = 0; i < Object.keys(condition).length; i++) {
    //   string_to_be_replaced = "= $" + (i + 1);
    //   const pos = search_query.text.indexOf(string_to_be_replaced);
    //   search_query.text = [
    //     search_query.text.slice(0, pos),
    //     "like $" + (mix_query_values.length + i + 1) + " ",
    //     search_query.text.slice(pos + string_to_be_replaced.length),
    //   ].join(""); //make query with 2 join
    // }
    // search_query_text = search_query.text;
    // search_query_values = search_query.values;
    // main_query = {
    //   text: remove_string_from_text(
    //     mix_query_text + " " + search_query_text,
    //     '"'
    //   ),
    //   values: mix_query_values.concat(search_query_values),
    // };
    // try {
    //   const res = await client.query(main_query);
    //   if (res.rowCount > 0) return res.rows;
    //   else return null;
    // } catch (error) {
    //   return error;
    // }
  },

  async remove(table, condition) {
    const options = {
      query_type: "remove",
      query_table: table,
      condition: condition,
    };

    main_query = generate.query(options);

    // //handle multi values like id IN (value1, value2, ...);
    // if (Array.isArray(condition)) {
    //   const pos = main_query.text.search("=");
    //   main_query.text = [main_query.text.slice(0, pos), "IN "].join(""); //make query like DELETE FROM your_table WHERE id IN

    //   valid_format_values_string = "("; //($1,$2,....)
    //   for (i = 0; i < condition.length; i++) {
    //     if (i + 1 === condition.length) {
    //       valid_format_values_string += "$" + (i + 1) + ")";
    //       break;
    //     }

    //     valid_format_values_string += "$" + (i + 1) + ",";
    //   }
    //   //updtae query text
    //   main_query.text += valid_format_values_string;
    // }

    try {
      const res = await runQuery(main_query);
      return true;
    } catch (error) {
      return error;
    }
  },

  async join_query(
    main_table,
    values,
    condition,
    join_type,
    joined_table,
    join_condition
  ) {
    const options = {
      table_name: main_table,
      values_list: values,
      condition: condition,
      join_json: {
        type: join_type,
        table: joined_table,
        on: join_condition,
      },
    };

    try {
      const res = await runQuery(generate.joinQuery(options));
      if (checkFoundData(res)) return res.recordset;
      else return null;
    } catch (error) {
      return error;
    }
  },

  async join3_query(
    main_table,
    values,
    condition,
    join_type,
    joined_table1,
    joined_table2,
    join_condition1,
    join_condition2
  ) {
    const options1 = {
      table_name: main_table,
      values_list: values,
      condition: condition,
      join_json: { type: join_type, table: joined_table1, on: join_condition1 },
    };

    main_query = generate.joinQuery(options1);

    const pos1 = main_query.search("where");

    const options2 = {
      table_name: main_table,
      values_list: {},
      condition: {},
      join_json: { type: join_type, table: joined_table2, on: join_condition2 },
    };

    second_query = generate.joinQuery(options2);

    const pos2 = second_query.search(join_type);
    second_query = second_query.slice(pos2, second_query.length); // to remove all string befor join type in query
    second_query = second_query.slice(0, second_query.length - 1); //to remove this ;
    main_query = [
      main_query.slice(0, pos1),
      second_query + " ",
      main_query.slice(pos1),
    ].join(""); //make query with 2 join

    main_query = main_query.replace(/\"/g, "");

    try {
      const res = await runQuery(main_query);
      if (checkFoundData(res)) return res.recordset;
      else return null;
    } catch (error) {
      return error;
    }
  },

  async custom_query(query) {
    assert(typeof query !== "undefined", "query text cannot be undefined");
    // assert(typeof values !== "undefined", "query values cannot be undifined");

    try {
      const res = await runQuery(query);
      if (checkFoundData(res)) return res.recordset;
      else return null;
    } catch (error) {
      return error;
    }
  },

  async uuidGenerator() {
    return (
      await runQuery(
        "DECLARE @guid uniqueidentifier = NEWID(); SELECT @guid as 'GUID';"
      )
    ).recordset[0].GUID;
  },
};

exports.queryMaker = queryMaker;
