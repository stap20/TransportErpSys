import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Switch,
  TextField,
} from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import React from "react";
import TextFieldValidator from "reactor/components/form/textfield-validator";
import { trans } from "reactor/localization";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filter = createFilterOptions();
export default function UserForm(props) {
  let { record } = props;
  const [kilos, setKilos] = React.useState(null);
  const [companyDriverAppear, setCompanyDriverAppear] = React.useState(true);
  const [iscompanyDriver, setDriver] = React.useState(false);
  const [iscompanyDriverLabel, setDriverLabel] = React.useState("");
  const [isdone, setDone] = React.useState(false);
  const updateKilos = (e) => {
    setKilos(e.target.value);
  };
  const updateDriver = (flag) => {
    if (flag) {
      setDriver(true);
      setDriverLabel("Company");
    } else {
      setDriver(false);
      setDriverLabel("Foreign");
    }
  };
  return (
    <form className="container-fluid p-0">
        <div className="form-group row mb-3">
          <div className="col-12 col-md-4 mb-2">
            <Autocomplete
              id="car_number"
              options={car_numbers}
              onChange={(event, newValue) => {
                newValue !== null ? setKilos(newValue.kilos) : setKilos(null);
              }}
              getOptionLabel={(option) => option.number}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label={trans("car_number")} />
              )}
            />
          </div>
          <div className="col-12 col-md-4 mb-2">
            <Autocomplete
              id="car_type"
              options={car_types}
              getOptionLabel={(option) => option.type}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label={trans("car_type")} />
              )}
            />
          </div>
          <div className="col-12 col-md-4 mb-2">
            <TextFieldValidator
              style={{ width: "100%" }}
              custome_change={updateKilos}
              id="kilo_meters"
              name={"kilo_meters"}
              label={trans("kilo_meters")}
              value={kilos !== null ? kilos : ""}
              validation_rules={[{ rule: "isnumber" }]}
              validation_messages={["Car Kilos" + " " + trans("isnumber")]}
            />
          </div>
        </div>

        <div className="form-group row mb-4">
          <div className="col-12">
            <Autocomplete
              multiple
              filterSelectedOptions
              id="malfunctions"
              limitTags={3}
              options={malfuctions_list}
              disableCloseOnSelect
              getOptionLabel={(option) => option.type}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.type}
                </React.Fragment>
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    style={{ fontSize: "0.7em" }}
                    variant="outlined"
                    label={option.type}
                    {...getTagProps({ index })}
                  />
                ))
              }
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label={trans("malfunctions")} />
              )}
            />
          </div>
        </div>
        <div className="form-group row mb-3">
          <div className="col-12 col-md-6 mb-2">
            <Autocomplete
              id="drivers"
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  if (newValue.type === 0) {
                    updateDriver(true);
                  } else {
                    updateDriver(false);
                  }
                  setCompanyDriverAppear(false);
                } else {
                  setCompanyDriverAppear(true);
                }
              }}
              options={driver_list}
              getOptionLabel={(option) => option.name}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label={trans("drivers")} />
              )}
            />
          </div>
          <div className="col-12 col-md-6 mt-md-2 mb-2">
            <h3>
              <span
                hidden={companyDriverAppear}
                className="badge badge-pill badge-primary"
              >
                {iscompanyDriverLabel}
              </span>
            </h3>
          </div>
        </div>
        <div className="form-group row mb-3">
          <div className="col">
            <Autocomplete
              hidden={isdone}
              multiple
              freeSolo
              filterSelectedOptions
              id="state_report"
              limitTags={3}
              options={state_reports}
              disableCloseOnSelect
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                // Suggest the creation of a new value
                var is_found =
                  state_reports.find(
                    (ele) => ele.title == params.inputValue
                  ) !== undefined;
                if (params.inputValue !== "" && !is_found) {
                  filtered.push({
                    inputValue: params.inputValue,
                    title: `Add "${params.inputValue}"`,
                  });
                }
                return filtered;
              }}
              getOptionLabel={(option) => {
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.title;
              }}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </React.Fragment>
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  var title = "";
                  if (option.inputValue !== undefined) {
                    var is_found =
                      state_reports.find(
                        (ele) => ele.title == option.inputValue
                      ) !== undefined;
                    if (!is_found) {
                      state_reports.push({ title: option.inputValue });
                    }
                    title = option.inputValue;
                  } else {
                    title = option.title;
                  }
                  return (
                    <Chip
                      style={{ fontSize: "0.7em" }}
                      variant="outlined"
                      label={title}
                      {...getTagProps({ index })}
                    />
                  );
                })
              }
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label={trans("state_report")} />
              )}
            />
          </div>
          <div className="col-12 col-md-4 mt-md-3 mb-2">
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Switch
                  checked={isdone}
                  onChange={() => setDone(!isdone)}
                  name="is_done"
                />
              }
              label={trans("fix_state")}
            />
          </div>
        </div>
        <div className="form-group row mb-3">
          <div className="col-3 mt-3 ml-auto">
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
            >
              {trans("save")}
            </Button>
          </div>
        </div>
    </form>
  );
}

{
  /* <TextFieldValidator
style={{ width: "100%" }}
name="carnumber"
label="Car Number"
size="small"
validation_rules={[
  { rule: "isnumber" },
  { rule: "maxlength", option: 4 },
]}
validation_messages={[
  "Car Number" + " " + trans("isnumber"),
  "Car Number" + " " + trans("maxlength") + " " + 4 + " Numbers",
]}
/> */
}

{
  /* <Autocomplete
multiple
id="checkboxes-tags-demo"
size={"small"}
limitTags={3}
onChange={(event, newValue) => {
  console.log(newValue);
}}
options={top100Films}
disableCloseOnSelect
getOptionLabel={(option) => option.title}
renderOption={(option, { selected }) => (
  <React.Fragment>
    <Checkbox
      icon={icon}
      checkedIcon={checkedIcon}
      style={{ marginRight: 8 }}
      checked={selected}
    />
    {option.title}
  </React.Fragment>
)}
renderTags={(value, getTagProps) =>
  value.map((option, index) => (
    <Chip
      variant="outlined"
      label={option}
      {...getTagProps({ index })}
    />
  ))
}
style={{ width: "100%" }}
renderInput={(params) => (
  <TextField {...params} label="Malfuctions" />
)}
/> */
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

const car_numbers = [
  { number: "1234", kilos: 50 },
  { number: "1235", kilos: 50 },
  { number: "1236", kilos: 50 },
  { number: "6666", kilos: 50 },
  { number: "1335", kilos: 50 },
];
const car_types = [
  { type: "coster" },
  { type: "malaky" },
  { type: "bus" },
  { type: "ma4ro3" },
];
const malfuctions_list = [
  { type: "kawtcha" },
  { type: "kat3aet 3'year" },
  { type: "ta3'yer zet" },
  { type: "other" },
];

const driver_list = [
  { name: "ahmed eldesoky", number: "5119", type: 0 },
  { name: "abdelhambedy al 3'andor", number: "6118", type: 0 },
  { name: "ahmed 3atya", type: 1 },
  { name: "mahmoud khalel", type: 1 },
];

const state_reports = [{ title: "Pending On Storage" }, { title: "other" }];