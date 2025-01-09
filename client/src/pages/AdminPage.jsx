import styles from "./AdminPage.module.scss";
import CompanyLogo from "../img/web-logo.png";
import NavButton from "../components/NavButton";
import NavMainButton from "../components/NavMainButton";
import LinkGrey from "../components/LinkGrey";
import LinkDefault from "../components/LinkDefault";
import LinkFooter from "../components/LinkFooter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Container } from "react-bootstrap";
import * as XLSX from "xlsx";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../src/index.js";
import { createAlert } from "../http/alertAPI";
import { createMailing } from "../http/mailingAPI";
import { hashPasswords } from "../http/userAPI";
import { observer } from "mobx-react-lite"

const AdminPage = observer(() => {


  const { alert, mailing } = useContext(Context);
  const [alerts, setAlerts] = useState([]);
  const [mailings, setMailing] = useState([]);
  const [inputValue, setTitleValue] = useState('');
  const [DateValue, setDateValue] = useState('');



  const [newLoad, setNewLoad] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Темы");
  const [selectedText, setSelectedText] = useState('');
  const fileRef = React.useRef(null);
  const [selectedButton, setSelectedButton] = useState('');
  const [formData, setFormData] = useState({ date: '', title: '', text: '',div: '',disp: '', });

  const handleChangeMailing = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setOpen(false);
    setName('Проф осмотры')
    handleButtonText('приглашаем вас пройти профилактический осмотр в поликлинике по месту жительства');
    handleButtonClick(1);
  };

  const handleMenuTwo = () => {
    setOpen(false);
    setName('ДН')
    handleButtonText('приглашаем вас пройти диспансерном наблюдение, просим посетить поликлинику в ');
    handleButtonClick(2);
  };



  const handleMenuThree = () => {
    setOpen(false);
    setName('Диспансеризация')
    handleButtonText('приглашаем вас пройти углубленную диспансеризация в поликлинике по месту жительства');
    handleButtonClick(1);
  };

  const CustomButton = ({ buttonText, onClick }) => (
    <button className={styles.button} onClick={onClick}>
      {buttonText}
    </button>
  );





  const handleITitleChange = (event) => {
    setTitleValue(event.target.value);
  };
  const handleIDateChange = (event) => {
    setDateValue(event.target.value);
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
          theme: item[6]
        };
      });
      setNewLoad(newLoad);
    };
    reader.readAsBinaryString(f);
  };
  const handleCreateAlerts = async () => {
    try {
      // Уникальность на основе поля compl и исключение null значений
      const uniqueLoad = Array.from(new Map(newLoad
        .filter(item => item.compl != null) // Исключаем записи с compl == null
        .map(item => [item.compl, item])) // Создаем Map для уникальных значений compl
      .values());
  
      const createdAlerts = await Promise.all(
        uniqueLoad.map(async (item) => {
          const newAlert = {
            title: inputValue,
            text: selectedText,
            date: DateValue,
            dispt: item.theme,
            mounth: item.Mounth,
            div: selectedButton,
            compl: item.compl,
            im: item.NAME,
            ot: item.OTCH,
            phone: item.phone,
          };
          return await createAlert(newAlert);
        })
      );
  
      alert.setAlerts([...alert.alerts, ...createdAlerts]);
      console.log('Созданные alerts:', createdAlerts);
  
      // Создание одного письма в mailingstore
      const newMailing = {
        title: inputValue,
        text: selectedText,
        date: DateValue,
        div: selectedButton
      };
  
      const createdMailing = await createMailing(newMailing);
      mailing.setMailings([...mailing.mailings, createdMailing]);
  
      console.log('Созданная mailing:', createdMailing);
    } catch (error) {
      console.error('Ошибка создания alerts или mailing:', error);
    }
  };
  
  useEffect(() => {
    console.log('Текущее состояние mailing store:', mailing);
  }, [mailing]);

  const PushClick = () => {
    console.log('Введенное значение:', inputValue);
    console.log('Выбранная newLoad:', newLoad);
  };


  const handleHash = async () => {
    try {
      const response = await hashPasswords();
      console.log(response.message);
    } catch (e) {
      console.log('Произошла ошибка при хешировании паролей');
    }
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
            onChange={handleITitleChange}
          ></input>
          <input className={styles.hashBtn}
            type="date"
            name="login"
            id="login"
            placeholder="Дата"
            onChange={handleIDateChange}
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
            trigger={<button buttonText={name} onClick={handleOpen} className={styles.btn}>{name}</button>}
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
          <NavMainButton className={styles.navbtn}
            text={"Загрузить список"}
            onClick={handleClick}
          ></NavMainButton>
          <NavMainButton
            text={"Начать рассылку"}
            onClick={handleCreateAlerts}
          ></NavMainButton>
          <Button
            variant={"outline-dark"}
            className="mt-4 p-2"
            onClick={PushClick}
          >
            Тест
          </Button>
          <Button
            className={styles.hashBtn}
            onClick={handleHash}
          >
            Хеширование паролей
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