import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import {
  TableDeleteButton,
  TableEditButton,
} from "shared/components/table/table-actions";
import { refresh } from "reactor/router";

const tableActions = {
  edit: TableEditButton,
  remove: TableDeleteButton,
};

export default function DataTable(props) {
  let { table_data, data } = props;
  if (table_data.actions !== undefined && !table_data.actionsIsAdded) {
    var actions = {
      name: "action",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const RenderTableActions = table_data.actions.map((ele, idx) => {
            const ActionButton = tableActions[ele.type];
            return (
              <React.Fragment key={idx}>
                <ActionButton
                  onClick={() => ele.clickEvent(dataIndex, rowIndex)}
                />
              </React.Fragment>
            );
          });
          return (
            <div className="row d-flex justify-content-start">
              {RenderTableActions}
            </div>
          );
        },
      },
    };
    table_data.columns.push(actions);
    table_data.actionsIsAdded = true;
  }

  const columns = table_data.columns;
  const options = table_data.options;
  return (
    <MUIDataTable
      title={"Malfunctions"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}
