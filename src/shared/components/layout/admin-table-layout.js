import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import ProgressBar from "reactor/components/progress-bar";
import { loadData,renderTable } from "./admin-table-layout-helpers";


export default function AdminTableLayout(props) {
  let { service, options } = props;

  let [isLoading, updateLoader] = useState(true);
  let [response, updateResponse] = useState({});

  // first step, set a loading state
  // second step, get data from service
  // third step, stop the loader and display the records

  // only once the component is rendered
  useEffect(() => {
    loadData(service, updateLoader, updateResponse);
  }, [service]);

  // Display In Progress Spinner
  // load the users data from API
  //
  let displayedContent = isLoading ? (
    <ProgressBar />
  ) : (
    renderTable(options, response)
  );

  return <>{displayedContent}</>;
}

AdminTableLayout.propTypes = {
  options: propTypes.any.isRequired,
  service: propTypes.object.isRequired,
};
