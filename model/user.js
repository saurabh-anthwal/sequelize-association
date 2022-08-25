module.exports = (sequelize,DataTypes,Model)=>{

class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false ,
    get() {
      const rawValue = this.getDataValue('firstName');
      return rawValue ? rawValue.toUpperCase() : null;
    }
  },
  lastName: {
    type: DataTypes.STRING,
    set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('lastName',value+',india');
    }
  }
}, {
  sequelize, // We need to pass the connection instance
  // modelName: 'Users' // We need to choose the model name
  paranoid:true,
  deletedAt:'soft_delete'
});
return User;

}
