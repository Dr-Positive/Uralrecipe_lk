const sequelize = require("../db");
const { DataTypes, BelongsTo, BelongsToMany } = require("sequelize");

const User = sequelize.define('user', {  // Пользователь. Информация о пользователях загруженных с базы plan_disp_m 
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true ,allowNull: false}, // id пользователя с первичным ключом и автоматическим созданием(автоинкрементирование)
  login: { type: DataTypes.STRING, unique: true }, // номер полиса
  password: { type: DataTypes.STRING}, // пока что номер договора
  role: { type: DataTypes.STRING, defaultValue: "USER"}, // роль может иметь два значения админ или застрахованный
  status: { type: DataTypes.INTEGER, defaultValue: 0 }, //  значение которое показывает состояние пользователя ( если заходил на сайт 1. если был проинформирован 2, а по стандарту 0)
  div: { type: DataTypes.INTEGER}, // вид осмотра
  dispt: { type: DataTypes.INTEGER}, // тема осмотра
  div2: { type: DataTypes.INTEGER}, // вид осмотра
  dispt2: { type: DataTypes.INTEGER}, // тема осмотра
  div3: { type: DataTypes.INTEGER}, // вид осмотра
  dispt3: { type: DataTypes.INTEGER}, // тема осмотра
  fam: { type: DataTypes.STRING}, // фамилия
  im: { type: DataTypes.STRING}, // имя
  ot: { type: DataTypes.STRING}, // отчество
  compl: { type: DataTypes.INTEGER, unique: true }, // комплект
  gender: { type: DataTypes.INTEGER }, // пол
});

const Mailing = sequelize.define('mailing', {
  // Рассылки. Информация о созданных рассылках
  //Когда создаётся рассылка записывается информация о данной рассылке
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true ,allowNull: false}, // id
  title: { type: DataTypes.STRING }, // название темы информирования(с фронта)
  text: { type: DataTypes.STRING }, // текст информирования(с фронта)
  dispt: { type: DataTypes.INTEGER }, // тема осмотра(с базы alert)
  div: { type: DataTypes.INTEGER }, // вид осмотра(с базы alert)
  // связь между  Alert и Mailing одна запись Mailing ко многим записям в Alert
});

const Alert = sequelize.define('alert', {
  //Сообщение. Записи всех отправленных сообщений.
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true ,allowNull: false},
  title: { type: DataTypes.STRING }, // название темы информирования(с фронта)
  text: { type: DataTypes.STRING }, // текст информирования(с фронта)
  dispt: { type: DataTypes.INTEGER }, // тема осмотра(с отчёта)
  div: { type: DataTypes.INTEGER }, // вид осмотра(с фронта)
  compl: { type: DataTypes.INTEGER }, // комплет-уникальный через него необходима проверка user на нахождение в базе(с отчёта) при нахождении пользователя необходима обновить у него status
  im: { type: DataTypes.STRING}, // имя информированного(с отчёта)
  ot: { type: DataTypes.STRING}, // отчество информированного(с отчёта)
  phone: { type: DataTypes.BIGINT}, // телефон информирования(с отчёта)
});

// Определение связей между моделями
User.hasMany(Alert); // У одного пользователя может быть много оповещений
Alert.belongsTo(User); // Оповещение принадлежит конкретному пользователю

// Определение связи между таблицами Mailing и Alert
Mailing.hasMany(Alert); // У одной рассылки может быть много оповещений
Alert.belongsTo(Mailing); // Оповещение принадлежит конкретной рассылке

module.exports = {
  User,
  Alert,
  Mailing,
};
//sequelize.drop()
//sequelize.sync()
