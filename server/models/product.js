'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model{}
  Product.init({
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Stock is required'
        },
        notEmpty: {
          msg: 'Stock is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Image url is required'
        },
        notEmpty: {
          msg: 'Image url is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    },
  },
  {
    hooks:{
      beforeSave(product, options) {
        if(!product.category) {
          product.category = 'other'
        }
      }
    },
    sequelize
  })

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};
