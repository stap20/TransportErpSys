import React from "react";
import events from "@flk/events";
import PropTypes from "prop-types";
import ReactorComponent from "reactor/components/reactor.component";
import { TextField } from "@material-ui/core";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const isEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export default class TextFieldValidator extends ReactorComponent {
  state = {
    validationError: null,
  };

  inputReference = React.createRef(); // createRef

  /**
   * {@inheritdoc}
   */
  init() {
    events.on("form.validation", (form) => {
      // validate the input
      this.handleChange(
        {
          target: this.input.children[0].children[1],
        },
        this.props.validation_rules,
        this.props.validation_messages
      );

      if (this.get("validationError")) {
        form.isValidForm = false;
      }
    });
  }

  /**
   * {@inheritdoc}
   */
  ready() {
    this.input = this.inputReference.current;
  }

  /**
   * Validate the input
   */
  validator(rule, data) {
    //return true if it's valid else false
    switch (rule.toLowerCase()) {
      case "isrequired":
        return required(data.val);
      case "isnumber":
        return isNumber(data.val);
      case "isemail":
        return isEmail(data.val);
      case "minlength":
        return minLength(data.option)(data.val);
      case "maxlength":
        return maxLength(data.option)(data.val);
      default:
        return false;
    }
  }

  handleChange(event, validation_rules, validation_message) {
    const data = event.target.value;

    for (var i = 0; i < validation_rules.length; i++) {
      let validate_data = {
        val: data,
        option: validation_rules[i].hasOwnProperty("option")
          ? validation_rules[i].option
          : "",
      };

      if (!this.validator(validation_rules[i].rule, validate_data)) {
        if (validation_message && i < validation_message.length) {
          this.set("validationError", validation_message[i]);
        } else {
          this.set("validationError", "Error");
        }
        return;
      } else {
        this.set("validationError", null);
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  render() {
    return (
      <TextField
        ref={this.inputReference}
        name={this.props.name}
        id={this.props.id}
        type={this.props.type}
        placeholder={this.props.placeholder}
        variant={this.props.variant}
        className={this.props.className}
        InputProps={this.props.inputprops}
        onChange={(e) => {
          this.handleChange(
            e,
            this.props.validation_rules,
            this.props.validation_messages
          );
          if (this.props.hasOwnProperty("custome_change")) {
            this.props.custome_change(e);
          }
        }}
        error={this.get("validationError") !== null ? true : false}
        helperText={this.get("validationError")}
        {...this.props}
      />
    );
  }
}

TextFieldValidator.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputprops: PropTypes.any,
  validation_rules: PropTypes.array,
  validation_messages: PropTypes.array,
};

TextFieldValidator.defaultProps = {
  type: "text",
};
