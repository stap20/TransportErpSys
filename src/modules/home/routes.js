import Home from "./components/home";
import Guardian from "modules/users/middleware/guardian";

export default function (route) {
  route("/", Home, [Guardian]);
}
