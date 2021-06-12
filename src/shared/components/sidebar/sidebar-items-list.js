import {
  AssessmentOutlined,
  NewReleasesOutlined,
  BuildOutlined,
  AssignmentOutlined,
} from "@material-ui/icons";

export default [
  {
    text: "Dashboard",
    route: "/",
    icon: (
      <AssessmentOutlined
        className="align-middle"
        style={{ fontSize: "1.5em" }}
      />
    ),
  },
  {
    text: "Malfunctions",
    route: "/malfunctions",
    icon: (
      <NewReleasesOutlined
        className="align-middle"
        style={{ fontSize: "1.5em" }}
      />
    ),
  },
  {
    text: "Maintenance",
    route: "/maintenance",
    icon: (
      <BuildOutlined className="align-middle" style={{ fontSize: "1.5em" }} />
    ),
  },
  {
    text: "Reports",
    route: "/reports",
    icon: (
      <AssignmentOutlined
        className="align-middle"
        style={{ fontSize: "1.5em" }}
      />
    ),
  },
];
