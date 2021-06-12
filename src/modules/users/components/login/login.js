import "./login.scss";
import React from "react";
import Form from "reactor/components/form/form";
import { login } from "modules/users/services/auth";
import { navigateTo } from "reactor/router";
import user from "user";
import Layout from "shared/components/layout/layout";
import layoutSetting from "shared/components/layout-settings";
import { Button, InputAdornment } from "@material-ui/core";
import { LockOutlined, VpnKeyOutlined } from "@material-ui/icons";
import { trans } from "reactor/localization";
import TextFieldValidator from "reactor/components/form/textfield-validator";
import { ToastProvider, useToasts } from "react-toast-notifications";

const FormWithToasts = (props) => {
  const { addToast } = useToasts();
  const { classes } = props;

  /**
   * submit login form
   */
  const loginHandler = async (e) => {
    login(e.target).then((res) => {
      var res = res.data;
      if (res.success) {
        console.log(res);
        user.login(res.result);
        navigateTo("/");
      } else {
        let errors = res.errors[0];
        addToast(errors, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      }
    });
  };

  return (
    <Form onSubmit={loginHandler}>
      <div className="form-group row mb-3">
        <div className="col">
          <TextFieldValidator
            name="login_code"
            style={{ width: "70%" }}
            id="login_code"
            placeholder={trans("login_code_placeholder")}
            variant="outlined"
            className="inputRounded"
            inputprops={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyOutlined className={classes.fontColor} />
                </InputAdornment>
              ),
            }}
            validation_rules={[{ rule: "isRequired" }, { rule: "isnumber" }]}
            validation_messages={[
              trans("login_code_placeholder") + " " + trans("isrequired"),
              trans("login_code_placeholder") + " " + trans("isnumber"),
            ]}
          />
        </div>
      </div>
      <div className="form-group row mb-4">
        <div className="col">
          <TextFieldValidator
            name="password"
            style={{ width: "70%" }}
            id="login_password"
            type="password"
            placeholder={trans("login_password_placeholder")}
            variant="outlined"
            className="inputRounded test"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined className={classes.fontColor} />
                </InputAdornment>
              ),
            }}
            validation_rules={[{ rule: "isRequired" }]}
            validation_messages={[
              trans("login_password_placeholder") + " " + trans("isrequired"),
            ]}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col">
          <Button
            type="submit"
            style={{ width: "70%", borderRadius: "50px" }}
            className="buttonRounded"
            variant="contained"
            color="primary"
          >
            {trans("login_button")}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default function Login(props) {
  const classes = layoutSetting();
  return (
    <Layout>
      <div
        className={classes.min_h_fullscreen + " " + "back-ground-image-style"}
      >
        <div className="card container-fluid main-content shadow">
          <div className="row text-center">
            <div className="col col-md-5 d-none d-lg-block p-0 m-0 card-img back-ground-login-coverimage-style"></div>
            <div className="col" style={{ padding: "0px" }}>
              <div className="card-body m-4 p-4">
                <h6
                  className={classes.fontDeepColor + " " + "mb-4"}
                  style={{ fontWeight: "bold" }}
                >
                  {trans("welcome_text")}
                </h6>
                <h6 className={classes.fontColor + " " + "mb-4"}>
                  {trans("app_name")}
                </h6>
                <p className={classes.fontColor + " " + "mb-4"}>
                  {trans("login_description")}
                </p>
                <ToastProvider>
                  <FormWithToasts classes={classes} />
                </ToastProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// <h1>Login Page</h1>
// <Form onSubmit={loginHandler}>
//   <FormInput
//     type="email"
//     name="email"
//     className="form-control"
//     placeholder="Email Address"
//   />

//   <FormInput
//     type="password"
//     name="password"
//     required={true}
//     className="form-control"
//     placeholder="Enter your password"
//   />

//   <div id="button-wrapper">
//     <button>Login</button>
//   </div>
// </Form>
