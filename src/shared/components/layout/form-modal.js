import React from "react";
import propTypes from "prop-types";
import Modal from "./modal";
import FormModalTitle from "./form-modal-title";
import Form from "reactor/components/form/form";
export default function FormModalo(props) {
  const { title, onSubmit, ...otherDialogProps } = props;

  let formHandler;

  const handleOnConfirm = () => {
    formHandler.submit();
  };

  const formTitle = (
    <FormModalTitle
      title={title}
      onSubmit={handleOnConfirm}
      onClose={props.onClose}
    />
  );
  return (
    <div>
      <Modal {...otherDialogProps} title={formTitle}>
        <Form onSubmit={onSubmit} ref={(form) => (formHandler = form)}>
          {props.children}
        </Form>
      </Modal>
    </div>
  );
}

FormModalo.propTypes = {
  title: propTypes.string.isRequired,
  open: propTypes.bool.isRequired, //same attribute name in the modal
  esc: propTypes.bool.isRequired,
  size: propTypes.string.isRequired,
  children: propTypes.any.isRequired,
  backdrop: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  fullScreen: propTypes.bool.isRequired, //same attribute name in the modal
};

FormModalo.defaultProps = {
  size: "xs",
  esc: true, //if set to false, then the esc button will not close the modal
  backdrop: true, //if set to false, then the backdrop click will not close the modal
  fullScreen: false,
};
