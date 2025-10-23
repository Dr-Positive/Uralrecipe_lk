import sequelize from "../db.js";
import { DataTypes, BelongsTo, BelongsToMany } from "sequelize";

const User = sequelize.define('user', {  // Пользователь. Информация о пользователях загруженных с базы plan_disp_m 
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // id пользователя с первичным ключом и автоматическим созданием(автоинкрементирование)
  login: { type: DataTypes.STRING, unique: true }, // номер полиса
  password: { type: DataTypes.STRING }, // пока что номер договора
  role: { type: DataTypes.STRING, defaultValue: "USER" }, // роль может иметь два значения админ или застрахованный
  status: { type: DataTypes.INTEGER, defaultValue: 0 }, //  значение которое показывает состояние пользователя ( если заходил на сайт 1. если был проинформирован 2, а по стандарту 0)
  div: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] }, // вид осмотра
  dispt: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] }, // тема осмотра 
  fam: { type: DataTypes.STRING }, // фамилия
  im: { type: DataTypes.STRING }, // имя
  ot: { type: DataTypes.STRING }, // отчество
  compl: { type: DataTypes.INTEGER, unique: true }, // комплект
  gender: { type: DataTypes.INTEGER }, // пол 
  tel: { type: DataTypes.CHAR(11), validate: {len: {args: [1, 11], msg: "Номер телефона должен содержать от 1 до 15 символов."}}}, // номер телефона 
  email: { type: DataTypes.STRING }, // текущая почта 
  emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  pendingEmail: { type: DataTypes.STRING, allowNull: true }, // адрес, на который отправлено письмо подтверждения (новый email до подтверждения)
  resetToken: { type: DataTypes.STRING, allowNull: true }, // токен для сброса пароля и почты
  
});

const Mailing = sequelize.define('mailing', {
  // Рассылки. Информация о созданных рассылках
  //Когда создаётся рассылка записывается информация о данной рассылке
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // id
  title: { type: DataTypes.STRING }, // название темы информирования(с фронта)
  text: { type: DataTypes.STRING }, // текст информирования(с фронта)
  date: { type: DataTypes.STRING }, // дата
  div: { type: DataTypes.INTEGER }, // вид осмотра(с базы alert)
  // связь между  Alert и Mailing одна запись Mailing ко многим записям в Alert
});

const Alert = sequelize.define('Alert', {
  //Сообщение. Записи всех отправленных сообщений.
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  title: { type: DataTypes.STRING }, // название темы информирования(с фронта)
  text: { type: DataTypes.STRING }, // текст информирования(с фронта)
  dispt: { type: DataTypes.INTEGER }, // тема осмотра(с отчёта)
  div: { type: DataTypes.INTEGER }, // вид осмотра(с фронта)
  compl: { type: DataTypes.INTEGER }, // комплет-уникальный через него необходима проверка user на нахождение в базе(с отчёта) при нахождении пользователя необходима обновить у него status
  date: { type: DataTypes.STRING }, // дата
  im: { type: DataTypes.STRING }, // имя информированного(с отчёта)
  ot: { type: DataTypes.STRING }, // отчество информированного(с отчёта)
  phone: { type: DataTypes.BIGINT }, // телефон информирования(с отчёта)
  mounth: { type: DataTypes.STRING }, // месяц информирования
  //mailingId: { type: DataTypes.INTEGER, references: { model: 'Mailing',  key: 'id'},  allowNull: false}
});

// Определение связей между моделями
User.hasMany(Alert); // У одного пользователя может быть много оповещений
Alert.belongsTo(User); // Оповещение принадлежит конкретному пользователю

// Определение связи между таблицами Mailing и Alert
Mailing.hasMany(Alert); // У одной рассылки может быть много оповещений
Alert.belongsTo(Mailing); // Оповещение принадлежит конкретной рассылке

export { Alert, User, Mailing };

//sequelize.drop({ cascade: true })
sequelize.sync()
