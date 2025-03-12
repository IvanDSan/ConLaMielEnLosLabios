import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const dbPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "pastor_dabelles",
  dateStrings: true,
});

//función que va a ejecutar una query a la pool
const executeQuery = async (sql, values = []) => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    let [result] = await connection.query(sql, values);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export default executeQuery;
