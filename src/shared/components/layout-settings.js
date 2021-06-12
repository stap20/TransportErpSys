import { makeStyles } from "@material-ui/core";
import Globals from "reactor/globals";

const drawerWidth = 240;

const layoutSettings = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  modalTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },

  modalTitleCloseBtn: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  fontColor: {
    color: "#afafaf",
  },

  fontDeepColor: {
    color: "#828282",
  },

  min_h_fullscreen: {
    minHeight: "100vh !important",
  },
}));

export default layoutSettings;
