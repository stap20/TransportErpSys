import React from "react";
import Modal from "shared/components/layout/modal";
import { Button } from "@material-ui/core";
import "../styles/confirm-modal.scss";
import { trans } from "reactor/localization";

export default function ConfirmModal(props) {
  let { cancleClick, confirmClick, open, message, title } = props;
  return (
    <Modal
      open={open}
      onSubmit={cancleClick}
      title={null}
      onClose={cancleClick}
      className={"custome-modal-size-xs"}
    >
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col d-flex justify-content-center">
            <h4 style={{ fontWeight: "600" }}>{title}</h4>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col d-flex justify-content-center">
            <p>{message}</p>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <Button
              variant="outlined"
              color="primary"
              className="m-2 rounded-confirm-btn"
              onClick={() => confirmClick()}
            >
              {trans("yes")}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="m-2 rounded-cancel-btn"
              onClick={() => cancleClick()}
            >
              {trans("no")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
