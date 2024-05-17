'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      // define association here
      static associate({MeetGreet, SetTime}) {
        Band.hasMany(MeetGreet, {
          foreignKey: 'band_id',
          as: 'meetGreets'
        } );
  
        Band.hasMany(SetTime, {
          foreignKey: 'band_id',
          as: 'setTimes'
        })
        // define association here
      }
    
    
  }
  Band.init({
    band_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  } ,
  name: {
      type:DataTypes.STRING,
      allowNull: false
  },
  genre: {
      type:DataTypes.TEXT,
      allowNull: false
  },
  available_start_time: {
      type:DataTypes.DATE,
      allowNull: false
  } ,
  end_time: {
      type:DataTypes.DATE,
      allowNull: false
  },
  founded: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Band',
  tableName: 'bands',
  timestamps: false
  });
  return Band;
};