import { VercelRequest, VercelResponse } from "@vercel/node";

import sequelize from "../config/database";
import Purchases from "../models/purchases";

const sync = async (req: VercelRequest, res: VercelResponse) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await Purchases.sync({ alter: true }); // This creates the table if it doesn't exist (and alters it if it does)
    console.log("Purchases table has been created.");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.status(500).json({ error: error });
  } finally {
    await sequelize.close();
  }
};

export default sync;
