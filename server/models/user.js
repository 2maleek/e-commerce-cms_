'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')

  class User extends Model{}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    roles: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeSave(user, options) {
        return hash(user.password)
        .then(encrypted => {
          user.password = encrypted
          if(!user.roles){
            user.roles = 'admin'
          }
        })
      }
    },
    sequelize
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product)
  };
  return User;
};
