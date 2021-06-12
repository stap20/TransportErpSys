import React, { useEffect, useState } from "react";
import { translatedTitle } from "reactor/metadata";
import { getCarsTypes } from "../service/service";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import DashboardLayout from "shared/components/layout/dashboard-layout";
import { AssessmentOutlined } from "@material-ui/icons";
import UserForm from "./user-form";
import DataTable from "shared/components/table/table";
import ConfirmModal from "shared/components/modal/confirm";
import { trans } from "reactor/localization";
import FormModal from "shared/components/modal/form";
import { Button } from "@material-ui/core";
import MalfunctionForm from "./malfunction-form";
import { getCurrentLocaleCode } from "reactor/localization/locales";

const table_data = {
  heading: "users",
  form: UserForm,
  singleName: "user",
  columns: [
    {
      name: "name",
      label: "Name",
      options: {
        sort: true,
      },
    },
    {
      name: "company",
      label: "Company",
      options: {
        sort: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        sort: false,
      },
    },
    {
      name: "state",
      label: "State",
      options: {
        sort: false,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        sort: false,
      },
    },
  ],
  data: [
    {
      name: "خميس محمود السعدي",
      company: "الاسكندرية الوطنية لتكرير البترول والبتروكيماويات",
      city: "الاسكندرية",
      state: "المكس",
      date: "28/2/2021",
    },
    {
      name: "John Walsh",
      company: "Test Corp",
      city: "Hartford",
      state: "CT",
      date: "28/2/2021",
    },
    {
      name: "Bob Herm",
      company: "Test Corp",
      city: "Tampa",
      state: "FL",
      date: "10/1/2021",
    },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
      date: "1/2/2019",
    },
  ],
  options: {},
};

export default function Users(props) {
  translatedTitle("test");
  const [removeModalIsOpen, setRemoveModalDisplay] = useState(false);
  const [addModalIsOpen, setAddModalDisplay] = useState(false);
  const [tableData, updateTableData] = useState(table_data.data);
  const [currentIdx, setCurrentIdx] = useState(0);

  let [isLoading, updateLoader] = useState(true);
  let [response, updateResponse] = useState({});

  useEffect(() => {
    getCarsTypes(updateLoader, updateResponse);
  }, [isLoading]);

  const triggerRemoveModal = () => {
    setRemoveModalDisplay(!removeModalIsOpen);
  };

  const triggerAddModal = () => {
    setAddModalDisplay(!addModalIsOpen);
  };

  const removeData = () => {
    const data = tableData;
    // const removed_row = tableData[currentIdx];
    data.splice(currentIdx, 1);
    updateTableData(data.concat([]));
    triggerRemoveModal();
  };

  table_data.actions = [
    {
      type: "edit",
      clickEvent: (rowIndex, dataIndex) => {
        console.log(rowIndex);
        window.alert(
          `Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`
        );
      },
    },
    {
      type: "remove",
      clickEvent: (rowIndex, dataIndex) => {
        triggerRemoveModal();
        setCurrentIdx(rowIndex);
      },
    },
  ]; // table button actions

  //console.log(response);
  return (
    <DashboardLayout params={props.params}>
      <div className="row mb-4">
        <div className="col">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              <HomeIcon />
              Home
            </Link>
            <Typography color="primary">
              <AssessmentOutlined />
              Dashboard
            </Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col d-flex justify-content-start">
          <Button
            style={
              getCurrentLocaleCode() === "ar"
                ? { width: "10em", fontSize: "1.2em", fontWeight: "600" }
                : { fontWeight: "60l0" }
            }
            onClick={triggerAddModal}
            variant="contained"
            color="primary"
          >
            {trans("add_malfunctions")}
          </Button>
          <FormModal
            open={addModalIsOpen}
            cancleClick={triggerAddModal}
            confirmClick={triggerAddModal}
            title={"test"}
          >
            <MalfunctionForm />
          </FormModal>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <ConfirmModal
            open={removeModalIsOpen}
            cancleClick={triggerRemoveModal}
            confirmClick={removeData}
            message={trans("confirmDelete")}
            title={"Confirm"}
          />

          <DataTable table_data={table_data} data={tableData} />
        </div>
      </div>
    </DashboardLayout>
  );
}
