import { Dialect, Sequelize } from "sequelize";

const database = process.env.DB_NAME as string;
const username = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;
const host = process.env.DB_HOST as string;
const dialect = "postgres" as Dialect;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Depending on your setup, you might need this
    },
  },
  logging: true,
});

export default sequelize;
