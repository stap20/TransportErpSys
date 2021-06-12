var jsonSql = require("json-sql")();
var assert = require("assert");

function fixQuery(query_data) {
  for (const [key, val] of Object.entries(query_data.values)) {
    if (typeof val === "string" || val instanceof String) {
      query_data.values[key] = "'" + val + "'";
    }
  }

  text = query_data.query;
  values = query_data.values;

  return eval("`" + text + "`");
}

function queryBuilder(options) {
  const mssql_prefix = {
    startPrefix: "${values.",
    endPrefix: "}",
  };

  return jsonSql.build(options, mssql_prefix);
}

const generate = {
  query(options) {
    var query_type = options.query_type;
    var query_table = options.query_table;
    var values_list = options.values_list;
    var condition = options.condition;
    var modifiers = options.modifiers;
    var sort = options.sort;

    assert(typeof query_type !== "undefined", "query type cannot be undefined");
    assert(
      typeof query_table !== "undefined",
      "query table cannot be undifined"
    );

    values_list = typeof values_list === "undefined" ? {} : values_list;
    condition = typeof condition === "undefined" ? {} : condition;
    modifiers = typeof modifiers === "undefined" ? {} : modifiers;
    sort = typeof sort === "undefined" ? {} : sort;

    var fields =
      values_list instanceof Array
        ? Object.keys(values_list[0])
        : Object.keys(values_list);

    var query_options = {
      type: query_type,
      table: query_table,
      fields: fields,
      values: values_list,
      condition: condition,
      modifier: modifiers,
      sort: sort,
    };

    return fixQuery(queryBuilder(query_options));
  },

  joinQuery(options) {
    var values_list = options.values_list;
    var condition = options.condition;

    assert(
      typeof options.table_name !== "undefined",
      "query table cannot be undefined"
    );
    assert(
      typeof options.join_json.type !== "undefined",
      "join type cannot be undifined"
    );
    assert(
      typeof options.join_json.table !== "undefined",
      "join table cannot be undifined"
    );
    assert(
      typeof options.join_json.on !== "undefined",
      "join condition cannot be undifined"
    );

    values_list = typeof values_list === "undefined" ? {} : values_list;
    condition = typeof condition === "undefined" ? {} : condition;

    var fields =
      options.values_list instanceof Array
        ? Object.keys(values_list[0])
        : Object.keys(values_list);

    var query_options = {
      table: options.table_name,
      fields: fields,
      condition: condition,
      join: [options.join_json],
    };

    return fixQuery(queryBuilder(query_options));
  },

  mixQuery(options) {
    var query_type = options.query_type;
    var queries = options.queries;

    assert(typeof query_type !== "undefined", "query type cannot be undefined");
    assert(typeof queries !== "undefined", "queries cannot be undifined");

    for (i = 0; i < queries.length; i++) {
      queries[i].type = "select";
      queries[i].values_list = queries[i].values;
      queries[i].fields =
        queries[i].values_list instanceof Array
          ? Object.keys(queries[i].values_list[0])
          : Object.keys(queries[i].values_list);
      delete queries[i].values;
    }

    var query_options = {
      type: query_type,
      queries: queries,
    };

    return fixQuery(queryBuilder(query_options));
  },
};

exports.generate = generate;
