import React, { useContext, useState } from "react";
import styles from "./AdminPage.module.scss";
import CompanyLogo from "../img/web-logo.png";
import NavButton from "../components/NavButton";
import NavMainButton from "../components/NavMainButton";
import LinkGrey from "../components/LinkGrey";
import LinkDefault from "../components/LinkDefault";
import LinkFooter from "../components/LinkFooter";
import Header from "../components/Header";
import Footer from "../components/Footer";

import * as XLSX from "xlsx";
import { Context } from "../index.js";

import {observer} from "mobx-react-lite"


const AdminPage = () => {



  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
  };




  const { devise } = useContext(Context);

  const [alert, setAlert] = useState(false);

  const fileRef = React.useRef(null);

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    e.preventDefault();

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
      console.log(newLoad);

      const name = parseSecond.map((item) => item.NAME);
      const Mounth = parseSecond.map((item) => item.Mounth);

      const strs = newLoad.map(
        (item) => `${item.NAME} ${parseSecond} ${item.Mounth}.`
      );

      //   const updatedText = "#name#, вы состоите на диспансерном учете, просим вас посетить поликлинику в #month#"
      //   .replace("#name#", name)
      //   .replace("#month#", Mounth);
      //   //Парсинг :\n${JSON.stringify(newLoad)}\n\n
      //   const message = `Парсинг с текстом:\n${JSON.stringify(updatedText)}`;
      console.log(strs);
    };
    reader.readAsBinaryString(f);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.block}>
          <input className={styles.textInput}
            type="text"
            name="login"
            id="login"
            placeholder="Название рассылки"
          ></input>
          <input
            type="file"
            name="file"
            id="file"
            placeholder="file"
            ref={fileRef}
            onChange={handleChange}
            style={{ display: "none" }}
          ></input>
          <Dropdown
            open={open}
            trigger={<button  className={styles.btn} onClick={handleOpen}>Тема</button>}
            menu={[ 
              <button className={styles.butn} onClick={handleMenuOne}>Проф осмотры</button>,
              <button className={styles.bttn} onClick={handleMenuTwo}>Дн</button>,
              <button className={styles.bttn} onClick={handleMenuTwo}>Диспансеризация</button>,
            ]}
          ></Dropdown>          
          <NavMainButton  className={styles.navbtn}
            text={"Загрузить"}
            onClick={handleClick}
          ></NavMainButton>
          <NavButton
            text={"Начать рассылку"} // onClick={handleClick}
          ></NavButton>
        </div>
      </div>
      <Footer />
    </div>
  );
};



const Dropdown = ({ open, trigger, menu }) => {
  return (
    <div className={styles.dropdown} >
      {trigger}
      {open ? (
        <ul className={styles.menu}>
          {menu.map((menuItem, index) => (
            <li key={index} className={styles.menu_item} >{menuItem}</li>
          ))}
        </ul>
      ) : null}
    </div>  
  );
};



export default AdminPage;
