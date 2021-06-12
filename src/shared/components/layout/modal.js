import React from "react";
import propTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Is from "@flk/supportive-is";
import { Typography } from "@material-ui/core";
import layoutSettings from "../layout-settings";
import "../styles/modal.scss";

function DefaultModalTitle(props) {
  const classes = layoutSettings();
  return (
    <DialogTitle disableTypography className={classes.modalTitle}>
      <Typography variant="h6">{props.title}</Typography>
      {props.onClose ? (
        <IconButton
          aria-label="close"
          className={classes.modalTitleCloseBtn}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Modal(props) {
  const classes = layoutSettings();
  const {
    size,
    esc,
    title,
    onClose,
    onConfirm,
    backdrop,
    ...otherDialogProps
  } = props;

  // default is passing title as a component
  let modalTitle = title;

  // otherwise, we will render the default modal title component
  if (Is.string(modalTitle)) {
    modalTitle = <DefaultModalTitle title={title} onClose={onClose} />;
  }

  return (
    <div>
      <Dialog
        fullWidth
        disableBackdropClick={!backdrop}
        disableEscapeKeyDown={!esc}
        maxWidth={size}
        onClose={onClose}
        {...otherDialogProps}
      >
        {modalTitle}
        <DialogContent dividers>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
  open: propTypes.bool.isRequired, //same attribute name in the modal
  esc: propTypes.bool.isRequired,
  size: propTypes.string.isRequired,
  children: propTypes.any.isRequired,
  backdrop: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  fullScreen: propTypes.bool.isRequired, //same attribute name in the modal
};

Modal.defaultProps = {
  size: "xs",
  esc: true, //if set to false, then the esc button will not close the modal
  backdrop: true, //if set to false, then the backdrop click will not close the modal
  fullScreen: false,
};
