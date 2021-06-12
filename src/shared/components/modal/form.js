import React from "react";
import Modal from "shared/components/layout/modal";
import "../styles/confirm-modal.scss";
import { trans } from "reactor/localization";

export default function FormModal(props) {
  let { cancleClick, confirmClick, open, title } = props;
  return (
  
    <Modal
      // backdrop={false}
      open={open}
      onSubmit={confirmClick}
      title={null}
      onClose={cancleClick}
      className={"custome-modal-size-md"}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-start">
            <h3>{title}</h3>
          </div>
        </div>
        <div className="row">{props.children}</div>
      </div>
    </Modal>
  );
}
