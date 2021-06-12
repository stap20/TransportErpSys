import React, { useState } from "react";
import { Obj } from "reinforcements";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { trans } from "reactor/localization";
import "../styles/table_header.scss";
import { TableDeleteButton, TableEditButton } from "./table-actions";
import Modal from "../layout/modal";
import { Button } from "@material-ui/core";

const defaultTableActions = {
  heading: "actions",
  buttons: [TableEditButton, TableDeleteButton],
};

export default function SimpleTableOld(props) {
  let { options, records } = props;
  const [formIsDisplayed, displayForm] = useState(false);
  const [record, setRecord] = useState({});
  const [recordIndex, setIndex] = useState(null);
  const [action, setAction] = useState(null);

  const recordUpdate = (record, index, currentAction) => {
    setRecord(record);
    setIndex(index);
    setAction(currentAction);
    if (currentAction === "edit") {
      displayForm(true);
    }
  };

  if (options.actions === true && !options.actionsIsAdded) {
    options.columns.push(defaultTableActions);
    options.actionsIsAdded = true;
  }

  let tableHeading = options.columns.map((column) => {
    return <TableCell key={column.heading}>{trans(column.heading)}</TableCell>;
  });

  let tableRows = records.map((record, recordIndex) => {
    return (
      <TableRow key={record.id}>
        {options.columns.map((column, columnIdx) => {
          if (column.buttons) {
            return (
              <TableCell key={columnIdx}>
                {column.buttons.map((ActionButton, index) => {
                  return (
                    <React.Fragment key={index}>
                      <ActionButton
                        onClick={(e, currentAction) =>
                          recordUpdate(record, index, currentAction)
                        }
                      />
                    </React.Fragment>
                  );
                })}
              </TableCell>
            );
          }
          return (
            <TableCell key={column.heading}>
              {Obj.get(record, column.key)}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

  const closeModal = () => {
    displayForm(false);
    setTimeout(() => {
      setAction(null);
    }, 100);
  };

  const itemType = action === "edit" ? "editItem" : "addItem";

  return (
    <>
      <Modal
        backdrop={false}
        open={formIsDisplayed}
        onSubmit={closeModal}
        title={trans(itemType, trans(options.singleName))}
        onClose={closeModal}
        size={"sm"}
      >
        <options.form record={record} />
      </Modal>

      <div className="row mb-3">
        <div className="col">
          <Button
            onClick={() => {
              displayForm(true);
            }}
            variant="contained"
            color="primary"
          >
            {trans("add_malfunctions")}
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="test">
                <TableRow>{tableHeading}</TableRow>
              </TableHead>
              <TableBody>{tableRows}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
