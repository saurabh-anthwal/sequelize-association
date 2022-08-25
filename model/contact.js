module.exports=(sequelize,DataTypes)=>{

const Contact = sequelize.define('contacts', {

  permanent_address: {
    type: DataTypes.STRING,
    allowNull: false
  },

  current_address: {
    type: DataTypes.STRING
  },
  // user_id:DataTypes.INTEGER

},{
  //optional
}

)
return Contact;
}
