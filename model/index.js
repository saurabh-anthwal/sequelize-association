const {Sequelize, DataTypes, Model} = require("sequelize");

const sequelize = new Sequelize('all-india','root','root',{
    host:'localhost',
    dialect:'mysql'
});

try{
    sequelize.authenticate();
    console.log("database connect");
} catch (error){
    console.log("unable to connect DB",error);
} 

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.user = require("./user")(sequelize, DataTypes, Model)
db.contact = require("./contact")(sequelize, DataTypes)
db.userContacts = require("./userContact")(sequelize, DataTypes,db.user,db.contact)


// db.user.hasOne(db.contact, {
//     foreignKey: 'user_id',
//     as: 'contactDetails', // change the contact name  now contactDetails
// });
// db.contact.belongsTo(db.user);


// db.user.hasMany(db.contact,{foreignKey: 'user_id',as:"contactDetails"});
// db.contact.belongsTo(db.user,{foreignKey: 'user_id',as:"userDetails"});

// db.user.belongsToMany(db.contact,{through:db.userContacts});
// db.contact.belongsToMany(db.user,{through:db.userContacts});


db.sequelize.sync({ force: false }); 

module.exports = db