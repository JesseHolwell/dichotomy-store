import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path to your database config

interface PurchaseAttributes {
  id: number;
  name: string;
  email: string;
  stripe_transaction_id: string;
  shipping_address: string;
  purchase_date?: Date;
  shipping_status?: 'pending' | 'shipped' | 'delivered';
  shipping_date?: Date;
}

interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id'> {}

class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public stripe_transaction_id!: string;
  public shipping_address!: string;
  public purchase_date?: Date;
  public shipping_status?: 'pending' | 'shipped' | 'delivered';
  public shipping_date?: Date;
}

Purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stripe_transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    shipping_status: {
      type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
      defaultValue: 'pending',
    },
    shipping_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'purchases',
  }
);

export default Purchase;