const sequelize = require('../db')
const {DataTypes, BelongsTo, BelongsToMany} = require('sequelize')

const User = sequelize.define('user ', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //
    login: {type:DataTypes.CHAR, unique: true},  // номер полиса 
    password: {type:DataTypes.CHAR },// пока что номер договора 
    role: {type:DataTypes.CHAR, defaultValue: 0}, // роль может иметь два значения админ или застрахованный 
    status: {type:DataTypes.INTEGER, defaultValue: 0}, //  значение которое показывает состояние пользователя ( если заходил на сайт 1. если был проинформирован 2, а по стандарту 0)   
    div:  {type:DataTypes.INTEGER}, // вид осмотра
    dispt: {type:DataTypes.INTEGER}, // тема осмотра
    div2:  {type:DataTypes.INTEGER}, // вид осмотра    
    dispt2: {type:DataTypes.INTEGER}, // тема осмотра
    div3:  {type:DataTypes.INTEGER}, // вид осмотра
    dispt3: {type:DataTypes.INTEGER}, // тема осмотра    
    fam: {type:DataTypes.CHAR}, // фамилия 
    im:  {type:DataTypes.CHAR}, // имя
    ot:  {type:DataTypes.CHAR}, // отчество
    compl: {type:DataTypes.INTEGER, unique: true}, // комплект
    gender:  {type:DataTypes.INTEGER}, // пол
});

// const Inform = sequelize.define('inform ', {
//     id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //
//     login: {type:DataTypes.CHAR, unique: true},  // номер полиса     
//     dispt: {type:DataTypes.INTEGER}, // тема осмотра
//     div:  {type:DataTypes.INTEGER}, // вид осмотра
//     fam: {type:DataTypes.CHAR}, // фамилия 
//     im:  {type:DataTypes.CHAR}, // имя
//     ot:  {type:DataTypes.CHAR}, // отчество
//     compl: {type:DataTypes.INTEGER}, // комплект
//     date: {type:DataTypes.DATE}, // комплект
// });

const Inform = sequelize.define('type_alert ', { // Проверка статуса пользователя изменяется когда пользователь заходит или получает сообщение о информировании
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    alertId: {type:DataTypes.INTEGER, primaryKey: true},
    userID: {type:DataTypes.INTEGER, primaryKey: true},
    // flag: {type:DataTypes.INTEGER}, // значение которое передаёт состояние пользователя ( если заходил на сайт 1. если был проинформирован 2)
    // Inform_id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Alert_id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // dispt:  {type:DataTypes.INTEGER}, // тема осмотра 
    // div:  {type:DataTypes.INTEGER},  // вид осмотра
});

const Alert = sequelize.define('alert ', {       //Сообщение которое информирует пользователя о осмотре их может быть несколько
    id: {type:DataTypes.INTEGER, primaryKey: true},
    title:{type:DataTypes.CHAR}, // название темы информирования
    text:{type:DataTypes.CHAR}, // текст информирования
    dispt:  {type:DataTypes.INTEGER}, // тема осмотра 
    div:  {type:DataTypes.INTEGER},  // вид осмотра
    date: {type:DataTypes.DATE}, // Дата информирования
    createdate: {type:DataTypes.DATE}, // Дата создания информирования
    updatedate: {type:DataTypes.DATE}, // Дата последнего обновления
    compl: {type:DataTypes.INTEGER}, // комплет-уникальный комплект
    im:{type:DataTypes.CHAR}, // имя информированного
    ot:{type:DataTypes.CHAR}, // отчество информированного
    phone:{type:DataTypes.INTEGER}, // телефон информирования   
});

User.hasOne(Alert) // Застраховнный получает сообщения 
Alert.belongsToMany(User, {through:Inform})

Alert.hasMany(User) // Отправляется сообщения
User.belongsTo(Alert)

Inform.hasOne(User) // Смена статуса при отправке
Alert.belongsTo(Inform)

Inform.hasOne(User) // Смена статуса при входе
User.belongsTo(Inform)

Inform.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Inform, { foreignKey: 'userId' });

Inform.belongsTo(Alert, { foreignKey: 'alertId' });
Alert.hasMany(Inform, { foreignKey: 'alertId' });

module.exports = {
    User, 
    Alert,
    Inform
}
 // sequelize.drop()
 // sequelize.sync()