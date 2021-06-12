import "./malf-form.scss";
import { Button, Checkbox, Chip, Divider, TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import React from "react";
import TextFieldValidator from "reactor/components/form/textfield-validator";
import { trans } from "reactor/localization";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CustomeSwitch from "reactor/components/switch";
import { getCurrentLocaleCode } from "reactor/localization/locales";
import { Cancel, Done } from "@material-ui/icons";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filter = createFilterOptions();

function MalfunctionHandler(props) {
  let {
    isHidden,
    isSpareHidden,
    currentCarType,
    triggerSpareChecked,
    malfuctionsList,
    sparePartsList,
    malfTrans,
    spareTrans,
  } = props;
  return (
    <>
      <div className="form-group row" hidden={isHidden}>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col">
              <Divider />
            </div>
          </div>

          <div className="row">
            <div
              className={
                "col-12" +
                (getCurrentLocaleCode() === "en" ? " col-md-8" : " col-md-9")
              }
            >
              <Autocomplete
                multiple
                filterSelectedOptions
                id={malfTrans}
                limitTags={1}
                options={malfuctionsList}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </React.Fragment>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      style={{ fontSize: "0.9em" }}
                      variant="outlined"
                      deleteIcon={<Cancel className="delete-icon" />}
                      label={option.name}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    size={"small"}
                    {...params}
                    label={trans(malfTrans)}
                  />
                )}
              />
            </div>
            <div
              className={
                "col pl-0 pr-0" +
                (getCurrentLocaleCode() === "en" ? " pt-3" : " pt-4")
              }
            >
              <CustomeSwitch
                firstLabel={trans("not_need")}
                lastLabel={trans("need")}
                checked={isSpareHidden}
                onChange={triggerSpareChecked}
                name={spareTrans + "_checked"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="form-group row" hidden={!isSpareHidden}>
        <div className="col">
          <Autocomplete
            multiple
            filterSelectedOptions
            disableCloseOnSelect
            id={spareTrans}
            key={currentCarType + isSpareHidden}
            limitTags={3}
            options={sparePartsList}
            getOptionLabel={(option) => option.name}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </React.Fragment>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  style={{ fontSize: "0.9em" }}
                  variant="outlined"
                  deleteIcon={<Cancel className="delete-icon" />}
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size={"small"}
                label={trans(spareTrans)}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}

export default function MalfunctionForm(props) {
  let { record } = props;
  const [currentCarType, setCurrentCarType] = React.useState("");
  const [kilos, setKilos] = React.useState(null);
  const [carsList, setcarsList] = React.useState([]);
  const [mechSparePartsList, setMechSparePartsList] = React.useState([]);
  const [elecSparePartsList, setElecSparePartsList] = React.useState([]);

  const [mechanicalMalfHidden, setMechanicalMalfHidden] = React.useState(true);
  const [electricalMalfHidden, setElectricalMalfHidden] = React.useState(true);

  const [mechSpareChecked, setMechSpareChecked] = React.useState(false);
  const [elecSpareChecked, setElecSpareChecked] = React.useState(false);

  const updateKilos = (e) => {
    setKilos(e.target.value);
  };

  const updateCarType = (carType) => {
    setcarsList(
      cars_data.filter((val) => {
        return val.type === carType;
      })
    );
    setMechSparePartsList(
      spare_data.filter((val) => {
        return val.type === carType || val.type === "مشترك";
      })
    );

    setElecSparePartsList(
      spare_data.filter((val) => {
        return val.type === carType || val.type === "مشترك";
      })
    );
  };

  const triggerMechSpareChecked = () => {
    setMechSpareChecked(!mechSpareChecked);
  };

  const triggerElecSpareChecked = () => {
    setElecSpareChecked(!elecSpareChecked);
  };

  return (
    <form className="container-fluid p-0">
      <div className="form-group row">
        <div className="col-12 col-md-4 mb-2">
          <Autocomplete
            id="car_type"
            options={car_types}
            onChange={(_, newSelectedVal) => {
              if (newSelectedVal !== null) {
                updateCarType(newSelectedVal);
              } else {
                setcarsList([]);
                setMechSparePartsList([]);
              }
              setCurrentCarType(newSelectedVal);
              setKilos(null);
            }}
            getOptionLabel={(option) => option}
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label={trans("car_type")} />
            )}
          />
        </div>
        <div className="col-12 col-md-4 mb-2">
          <Autocomplete
            id="car_number"
            options={carsList}
            key={currentCarType}
            onChange={(_, newSelectedVal) => {
              newSelectedVal !== null
                ? setKilos(newSelectedVal.kilo_meters)
                : setKilos(null);
            }}
            getOptionLabel={(option) => option.car_no}
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label={trans("car_number")} />
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
      <div className="form-group row">
        <div className="col">
          <Autocomplete
            multiple
            filterSelectedOptions
            id="malfunction_types"
            limitTags={2}
            onChange={(_, newSelectedVal) => {
              if (newSelectedVal !== null) {
                if (newSelectedVal.find((ele) => ele.type === 0)) {
                  if (mechanicalMalfHidden === true) {
                    setMechanicalMalfHidden(false);
                  }
                } else {
                  setMechanicalMalfHidden(true);
                }

                if (newSelectedVal.find((ele) => ele.type === 1)) {
                  if (electricalMalfHidden === true) {
                    setElectricalMalfHidden(false);
                  }
                } else {
                  setElectricalMalfHidden(true);
                }
              }
            }}
            options={malfunction_types}
            getOptionLabel={(option) => option.name}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </React.Fragment>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  style={{ fontSize: "0.9em" }}
                  variant="outlined"
                  deleteIcon={<Cancel className="delete-icon" />}
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size={"small"}
                label={trans("malfunction_types")}
              />
            )}
          />
        </div>
      </div>
      <MalfunctionHandler
        isHidden={mechanicalMalfHidden}
        isSpareHidden={mechSpareChecked}
        currentCarType={currentCarType}
        triggerSpareChecked={triggerMechSpareChecked}
        malfuctionsList={malfuctions_list}
        sparePartsList={mechSparePartsList}
        malfTrans="mech_malf_desc"
        spareTrans="choose_spare_parts"
      />

      <MalfunctionHandler
        isHidden={electricalMalfHidden}
        isSpareHidden={elecSpareChecked}
        currentCarType={currentCarType}
        triggerSpareChecked={triggerElecSpareChecked}
        malfuctionsList={malfuctions_list}
        sparePartsList={elecSparePartsList}
        malfTrans="elec_malf_desc"
        spareTrans="choose_spare_parts"
      />
    </form>
  );
}

const cars_data = [
  {
    car_no: "1384",
    type: "كوستر",
    kilo_meters: 1800,
    drivers: [{ name: "سعيد السيد", number: "1101", type: 0 }],
  },
  {
    car_no: "1397",
    type: "كوستر",
    kilo_meters: 3750,
    drivers: [{ name: "إبراهيم مسعود", number: "1009", type: 0 }],
  },
  {
    car_no: "1456",
    type: "ملاكي",
    kilo_meters: 0,
    drivers: [{ name: "جابر محمد", number: "1010", type: 0 }],
  },
  {
    car_no: "1457",
    type: "ملاكي",
    kilo_meters: 1659,
    drivers: [{ name: "احمد سعيد", number: "1011", type: 0 }],
  },
  {
    car_no: "1595",
    type: "كوستر",
    kilo_meters: 0,
    drivers: [{ name: "سعد علي", number: "1050", type: 0 }],
  },
  {
    car_no: "1689",
    type: "كوستر",
    kilo_meters: 1763,
    drivers: [{ name: "خلف محمود", number: "1018", type: 0 }],
  },
  {
    car_no: "2164",
    type: "كوستر",
    kilo_meters: 3633,
    drivers: [{ name: "عبد المجيد محمد", number: "1007", type: 0 }],
  },
  {
    car_no: "2374",
    type: "ملاكي",
    kilo_meters: 2804,
    drivers: [{ name: "عبد الواحد السيد", number: "73", type: 0 }],
  },
  {
    car_no: "2378",
    type: "ملاكي",
    kilo_meters: 860,
    drivers: [{ name: "حازم عبدالله", number: "65", type: 0 }],
  },
  {
    car_no: "2391",
    type: "كوستر",
    kilo_meters: 0,
    drivers: [{ name: "ايمن محمود", number: "80", type: 0 }],
  },
  {
    car_no: "2579",
    type: "ملاكي",
    kilo_meters: 1054,
    drivers: [{ name: "خالد محسن", number: "80", type: 0 }],
  },
  {
    car_no: "2657",
    type: "ملاكي",
    kilo_meters: 0,
    drivers: [{ name: "حسن حجاج", number: "1210", type: 0 }],
  },
  {
    car_no: "2734",
    type: "كوستر",
    kilo_meters: 1154,
    drivers: [{ name: "مسعود عبد المجيد", number: "45", type: 0 }],
  },
  {
    car_no: "2846",
    type: "كوستر",
    kilo_meters: 1510,
    drivers: [
      { name: "حسن علام", number: "115", type: 0 },
      { name: "محمود ابو السعود", number: "200", type: 0 },
    ],
  },
  {
    car_no: "2886",
    type: "مطافي",
    kilo_meters: 0,
    drivers: [
      { name: "محمد محمود", number: "2000", type: 0 },
      { name: "هشام جميل", number: "1960", type: 0 },
    ],
  },
];

const spare_data = [
  {
    name: "مساعد امامي يمين",
    type: "كوستر",
  },
  {
    name: "مساعد امامي يسار",
    type: "كوستر",
  },
  {
    name: "مساعد خلفي يمين",
    type: "كوستر",
  },
  {
    name: "مساعد خلفي يسار",
    type: "كوستر",
  },
  {
    name: "صدام امامي",
    type: "كوستر",
  },
  {
    name: "شبك صدام",
    type: "كوستر",
  },
  {
    name: "شمعة امامي يسار",
    type: "كوستر",
  },
  {
    name: "اسطب خلفي يسار",
    type: "كوستر",
  },
  {
    name: "كمبروسر مكيف",
    type: "كوستر",
  },
  {
    name: "بطارية",
    type: "مشترك",
  },
  {
    name: "طقم فحمات فرامل خلفية",
    type: "ملاكي",
  },
  {
    name: "رديتر ماء",
    type: "ملاكي",
  },
  {
    name: "اسطب رفرف يسار",
    type: "ملاكي",
  },
  {
    name: "خرطوم مياه خلفي",
    type: "مطافي",
  },
  {
    name: "سلم جانبي",
    type: "مطافي",
  },
];

const change_oil_list = [
  {
    name: "ماتور",
    type: 0,
  },
  {
    name: "دروبوكس",
    type: 1,
  },
];

const car_types = cars_data
  .map((val) => val.type)
  .filter((val, idx, self) => {
    return self.indexOf(val) === idx;
  });

const malfunction_types = [
  { name: "عطل ميكانيكي", type: 0 },
  { name: "عطل كهربائي", type: 1 },
  { name: "عفشة و حدادة", type: 2 },
  { name: "سمكرة ودوكو", type: 3 },
];

const malfuctions_list = [
  { name: "خلل بتروس المحركة للحساس" },
  { name: "ضعف و توقف رأس البخاخ عن العمل" },
  { name: "(ABS) حساس مكابح على الجانب الخلفي اليمين لا يعمل" },
  { name: "مؤشر البنزين مفصولة مع العوامة في خزان الوقود" },
  { name: "توقف عمل الكهرباء عن وحدة التحكم للمحرك" },
  { name: "مشكلة في حساس السرعة" },
  { name: "G40 هناك عطل في حساس" },
  { name: "عطل في حساس رأس البخاخ" },
];

const state_reports = [{ title: "Pending On Storage" }, { title: "other" }];
