import React from "react";
import "../styles/sidebar-item.scss";
import { Button } from "@material-ui/core";
import config from "reactor/config";
import Link from "reactor/components/link";

export default function SidebarItem(props) {
  let { open, btnIcon, btnText, id, onClick, route } = props;
  const [isactive, setCurrentActive] = React.useState(false);
  const [iscollapse, setCollapsing] = React.useState(false);
  const [btn_class, setBtnClass] = React.useState("");
  const [btn_collapse, setBtnCollapse] = React.useState("");
  const [btn_font_class, setBtnFontClass] = React.useState(
    " sidebarBtnFont_normal"
  );
  const [btn_icon_class, setBtnIconClass] = React.useState("col-12 col-md-3");
  const [btn_text_class, setBtnTextClass] = React.useState(
    "col p-0 align-middle text-left"
  );

  const activeId = config.get("activeId");

  const toggleBtn = (state) => {
    setBtnClass(state !== true ? " sidebarBtn_active" : "");
    setBtnFontClass(
      state !== true ? " sidebarBtnFont_active" : " sidebarBtnFont_normal"
    );
    setCurrentActive(!state);
  };

  const toggleCollapse = (state) => {
    setBtnCollapse(state === true ? " sidebarBtn_collapse" : "");
    setBtnIconClass(
      state === true ? "col-12 sidebarBtnIconFont_collapse" : "col-12 col-md-3"
    );
    setBtnTextClass(
      state === true
        ? "col-12 p-0 text-center sidebarBtnTextFont_collapse"
        : "col p-0 align-middle text-left"
    );
    setCollapsing(!state);
  };

  if (id === activeId && !isactive) {
    toggleBtn(isactive);
  } else if (id !== activeId && isactive) {
    toggleBtn(isactive);
  }

  if (open && !iscollapse) {
    toggleCollapse(iscollapse);
  } else if (!open && iscollapse) {
    toggleCollapse(iscollapse);
  }

  return (
    <Link
      className={"d-flex mb-2 sidebarBtn_normal" + btn_class + btn_collapse}
      onClick={() => onClick(id)}
      to={route}
    >
      <Button
        className={btn_font_class}
        style={{ width: "100%", fontSize: "1.3em" }}
      >
        <div className="container">
          <div className="row">
            <div className={btn_icon_class}>{btnIcon}</div>
            <div className={btn_text_class}>
              <span>{btnText}</span>
            </div>
          </div>
        </div>
      </Button>
    </Link>
  );
}

/**
 * ff5704
 * d-flex justify-content-center
 */

// import React from "react";
// import "../styles/sidebar-item.scss";
// import { Button } from "@material-ui/core";
// import config from "reactor/config";
// import Link from "reactor/components/link";
// import { getCurrentLocaleCode } from "reactor/localization/locales";

// export default function SidebarItem(props) {
//   let { open, btnIcon, btnText, id, onClick, route } = props;
//   const [isactive, setCurrentActive] = React.useState(false);
//   const [iscollapse, setCollapsing] = React.useState(false);
//   const [btn_class, setBtnClass] = React.useState("");
//   const [btn_collapse, setBtnCollapse] = React.useState("");
//   const [btn_font_class, setBtnFontClass] = React.useState(
//     " sidebarBtnFont_normal"
//   );
//   const [btn_icon_class, setBtnIconClass] = React.useState("");
//   const [btn_text_class, setBtnTextClass] = React.useState(
//     "align-middle text-left"
//   );

//   const activeId = config.get("activeId");

//   const toggleBtn = (state) => {
//     setBtnClass(state !== true ? " sidebarBtn_active" : "");
//     setBtnFontClass(
//       state !== true ? " sidebarBtnFont_active" : " sidebarBtnFont_normal"
//     );
//     setCurrentActive(!state);
//   };

//   const toggleCollapse = (state) => {
//     setBtnCollapse(state === true ? "sidebarBtn_collapse" : "");
//     setBtnIconClass(state === true ? "sidebarBtnIconFont_collapse" : "");
//     setBtnTextClass(
//       state === true
//         ? "text-center sidebarBtnTextFont_collapse"
//         : "align-middle text-left" +
//             (getCurrentLocaleCode() === "en" ? " ml-2" : " mr-2")
//     );
//     setCollapsing(!state);
//   };

//   if (id === activeId && !isactive) {
//     toggleBtn(isactive);
//   } else if (id !== activeId && isactive) {
//     toggleBtn(isactive);
//   }

//   if (open && !iscollapse) {
//     toggleCollapse(iscollapse);
//   } else if (!open && iscollapse) {
//     toggleCollapse(iscollapse);
//   }

//   return (
//     <Link
//       className={"d-flex mb-2 sidebarBtn_normal" + btn_class + btn_collapse}
//       onClick={() => onClick(id)}
//       to={route}
//     >
//       <Button
//         className={btn_font_class}
//         style={{ width: "100%", fontSize: "1.3em" }}
//       >
//         <div className="container">
//           <div className="row d-flex justify-content-start">
//             <div className={btn_icon_class}>{btnIcon}</div>
//             <div className={btn_text_class} style={{ paddingTop: "0.1em" }}>
//               <span>{btnText}</span>
//             </div>
//           </div>
//         </div>
//       </Button>
//     </Link>
//   );
// }

// /**
//  * ff5704
//  * d-flex justify-content-center
//  */
