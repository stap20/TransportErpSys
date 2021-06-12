import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import Tooltip from "reactor/components/tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { trans } from "reactor/localization";

export function TableAddButton(props) {
  return (
    <IconButton>
      <Tooltip title={trans("add")}>
        <AddIcon fontSize="large" color="primary" />
      </Tooltip>
    </IconButton>
  );
}

export function TableViewButton(props) {
  return (
    <IconButton>
      <Tooltip title={trans("view")}>
        <ViewIcon />
      </Tooltip>
    </IconButton>
  );
}

export function TableEditButton(props) {
  const editClick = (e) => {
    props.onClick(e, "edit");
  };
  return (
    <IconButton onClick={editClick}>
      <Tooltip title={trans("edit")}>
        <EditIcon color="primary" />
      </Tooltip>
    </IconButton>
  );
}

export function TableDeleteButton(props) {
  const deleteClick = (e) => {
    props.onClick(e, "remove");
  };
  return (
    <IconButton onClick={deleteClick}>
      <Tooltip title={trans("remove")}>
        <DeleteIcon color="error" />
      </Tooltip>
    </IconButton>
  );
}
