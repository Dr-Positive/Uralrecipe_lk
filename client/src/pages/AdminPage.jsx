import styles from "./AdminPage.module.scss";
import CompanyLogo from "../img/web-logo.png";
import NavButton from "../components/NavButton";
import NavMainButton from "../components/NavMainButton";
import LinkGrey from "../components/LinkGrey";
import LinkDefault from "../components/LinkDefault";
import LinkFooter from "../components/LinkFooter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Button, Container} from "react-bootstrap";
import * as XLSX from "xlsx";
import React, { useContext,useEffect, useState } from "react";
import { Context } from "../../src/index.js";
import { createAlert } from "../http/alertAPI";
import {observer} from "mobx-react-lite"



const AdminPage = observer(() => {


  const { alert } = useContext(Context);
  const [alerts, setAlerts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [newLoad, setNewLoad] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Темы");
  const [selectedButton, setSelectedButton] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const fileRef = React.useRef(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setOpen(false);
    setName('Проф осмотры')
    handleButtonClick(12);
    handleButtonText('приглашаем вас пройти профилактический осмотр в поликлинике по месту жительства');
  };

  const handleMenuTwo = () => {    
    setOpen(false);    
    setName('ДН')
    handleButtonClick(400);
    handleButtonText('приглашаем вас пройти профилактический осмотр в поликлинике по месту жительства');
  };

  const handleMenuThree = () => {    
    setOpen(false);    
    setName('Диспансеризация')
    handleButtonClick(1);
    handleButtonText('приглашаем вас пройти углубленную диспансеризация в поликлинике по месту жительства');
  };

  const CustomButton = ({ buttonText, onClick }) => (
    <button className={styles.button} onClick={onClick}>
      {buttonText}
    </button>
  );

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (buttonName) => {  
  setSelectedButton(buttonName);
};
const handleButtonText = (buttonName) => {  
  setSelectedText(buttonName);
};
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
      setNewLoad(newLoad);     
    };
    reader.readAsBinaryString(f);
  };
  const handleCreateAlerts = async () => {
    try {
      const createdAlerts = await Promise.all(
        newLoad.map(async (item) => {
          const newAlert = {
            title: inputValue,
            text: selectedText,
            dispt: selectedButton,
            div: 1,
            compl: item.compl,
            im: item.NAME,
            ot: item.OTCH,
            phone: item.phone,
            userId: 1, // Установите userId для кого создается alert
            mailingId: null,
          };
          return await createAlert(newAlert);
        })
      );

      alert.setAlerts([...alert.alerts, ...createdAlerts]);
      console.log('Созданные alerts:', createdAlerts);
    } catch (error) {
      console.error('Ошибка создания alerts:', error);
    }
  };

  const PushClick = () => {
    console.log('Введенное значение:', inputValue);
    console.log('Выбранная кнопка:', selectedButton);
    console.log('Выбранная newLoad:', newLoad);
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
          ></input>
          <Dropdown          
            open={open}
            trigger={<button  buttonText={name} onClick={handleOpen} className={styles.btn}>{name}</button>}
            menu={[
              <CustomButton
                buttonText="Проф осмотры"
                onClick={handleMenuOne}
              />,
              <CustomButton
                buttonText="Дн"
                onClick={handleMenuTwo}
              />,
              <CustomButton
                buttonText="Диспансеризация"
                onClick={handleMenuThree}
              />
            ]}
            
          ></Dropdown>          
          <NavMainButton  className={styles.navbtn}
            text={"Загрузить список"}
            onClick={handleClick}
          ></NavMainButton>
          <NavMainButton
            text={"Начать рассылку"}  
            onClick={PushClick}
          ></NavMainButton>     
          <Button
            variant={"outline-dark"}
            className="mt-4 p-2"
            onClick={handleCreateAlerts}
          >
            CREATE ALERT
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
});



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