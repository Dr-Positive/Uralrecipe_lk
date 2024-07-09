import styles from "./AdminPage.module.scss";
import CompanyLogo from "../img/web-logo.png";
import NavButton from "../components/NavButton";
import NavMainButton from "../components/NavMainButton";
import LinkGrey from "../components/LinkGrey";
import LinkDefault from "../components/LinkDefault";
import LinkFooter from "../components/LinkFooter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from 'react-bootstrap/Form';
import * as XLSX from "xlsx";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../src/index.js";
import {createАlert, fetchBrands, fetchDevices, fetchTypes} from "../http/alertAPI";
import { observer } from "mobx-react-lite";
import alertStore from "../store/AlertStore.js";

const AdminPage = observer(() => {
  const createAlert = { message: "New alert message" };
  const { alert } = useContext(Context);
  const [alerts, setAlerts] = useState([]);
  const [title, setTitle] = useState("");
  const [name, setName] = React.useState("Темы");
  const [file, setFile] = useState(null)

  const addAlert = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append('file', file)
    //formData.append('alertId', alert.selectedBrand.id)
    formData.append('typeId', alert.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createАlert(formData).then(data => onHide())

    // const ims = newLoad.map((item) => item.NAME);
    // const ots = newLoad.map((item) => item.OTCH);
    // const compls = newLoad.map((item) => item.compl);
    // const phones = newLoad.map((item) => item.phone);
    // const dispts = newLoad.map((item) => item.theme);

    // const newAlerts = [
    //   ...alerts,
    //   {
    //     id: selectedButton,
    //     title: inputValue,
    //     im: `${ims.join(", ")}`,
    //     ot: `${ots.join(", ")}`,
    //     compl: `${compls.join(", ")}`,
    //     phone: `${phones.join(", ")}`,
    //     dispt: `${dispts.join(", ")}`,
    //     id: Date.now(),
    //   },
    // ];
    // setAlerts(newAlerts);
    // console.log("Введенное значение:", newAlerts);
  };

  const [inputValue, setInputValue] = useState("");
  const [newLoad, setnewLoad] = useState([]);

  const [open, setOpen] = React.useState(false);
  //const [name, setName] = React.useState("Темы");
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setOpen(false);
    setName("Проф осмотры");
    handleButtonClick("Проф осмотры");
  };

  const handleMenuTwo = () => {
    setOpen(false);
    setName("ДН");
    handleButtonClick("ДН");
  };

  const handleMenuThree = () => {
    setOpen(false);
    setName("Диспансеризация");
    handleButtonClick("Диспансеризация");
  };

  const CustomButton = ({ buttonText, onClick }) => (
    <button className={styles.button} onClick={onClick}>
      {buttonText}
    </button>
  );

  const [info, setInfo] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const fileRef = React.useRef(null);

  const handleClick = () => {
    fileRef.current.click();
  };

    const selectFile = e => {
        setFile(e.target.files[0])
    

    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const secondPageName = readedData.SheetNames[1];
      const secondPage = readedData.Sheets[secondPageName];
      const parseSecond = XLSX.utils.sheet_to_json(secondPage, { header: 1 });
      console.log(parseSecond);
      dataParse.splice(0, 1);
      console.log(dataParse);

      const newLoad = dataParse.map((item) => {
        return {
          phone: item[0],
          NAME: item[1],
          END: item[2],
          OTCH: item[3],
          Mounth: item[4],
          compl: item[5],
          theme: item[6],
        };
      });

      setnewLoad(newLoad);
    };
    reader.readAsBinaryString(f);
  };

  const PushClick = () => {
    console.log("Введенное значение:", inputValue);
    console.log("Выбранная кнопка:", selectedButton);
    console.log("Выбранная newLoad:", newLoad);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.block}>
          {/* <input
            className={styles.textInput}
            type="text"
            name="login"
            id="login"
            placeholder="Название рассылки"
            onChange={handleInputChange}
          ></input>
          <input
            type="file"
            name="file"
            id="file"
            placeholder="file"
            ref={fileRef}
            onChange={handleChange}
            style={{ display: "none" }}
          ></input> */}

          <Form.Control
            value={titles}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.textInput}
            placeholder="Введите название рассылки"
          />
          <Form.Control
            style={{ display: "none" }}
            type="file"
            onChange={selectFile}
            ref={fileRef}
          />
          <Dropdown
            open={open}
            trigger={
              <button
                buttonText={name}
                onClick={handleOpen}
                className={styles.btn}
              >
                {name}
              </button>
            }
            menu={[
              <CustomButton
                buttonText="Проф осмотры"
                //onClick={handleMenuOne}
                onClick={() => device.setSelectedType(type)}
                key={type.id}
              />,
              <CustomButton
                buttonText="Дн"
                onClick={() => device.setSelectedType(type)}
                key={type.id}
              />,
              <CustomButton
                buttonText="Диспансеризация"
                onClick={() => device.setSelectedType(type)}
                key={type.id}
              />,
            ]}
          ></Dropdown>
          <NavMainButton
            className={styles.navbtn}
            text={"Загрузить список"}
            onClick={handleClick}
          ></NavMainButton>
          <NavMainButton
            text={"Начать рассылку"}
            onClick={PushClick}
          ></NavMainButton>
          <NavMainButton
            text={"Начать тест"}
            onClick={addAlert}
          ></NavMainButton>
        </div>
      </div>
      <Footer />
    </div>
  );
});

const Dropdown = ({ open, trigger, menu }) => {
  return (
    <div className={styles.dropdown}>
      {trigger}
      {open ? (
        <ul className={styles.menu}>
          {menu.map((menuItem, index) => (
            <li key={index} className={styles.menu_item}>
              {menuItem}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default AdminPage;
