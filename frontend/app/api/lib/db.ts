import mysql from 'serverless-mysql';
// import dotenv from "dotenv";
// dotenv.config({ path: "../../../.env" });

type RowData = {
    id: number;
    mac: string;
    start_date: string;
    expiration_date: string;
}


const db = mysql({
    config: {
      host: process.env.MYSQL_DATABASE_HOST,
      port: Number(process.env.MYSQL_DATABASE_PORT!),
      database: process.env.MYSQL_DATABASE_NAME,
      user: process.env.MYSQL_DATABASE_USERNAME,
      password: process.env.MYSQL_DATABASE_PASSWORD,
    }
  });

  export default async function executeQuery({ query, values }: { query: string, values?: any[] }) {   
    try {
      const results = await db.query<RowData[]>(query, values);
      await db.end();
      return results;
    } catch (error) {
      throw new Error("Error executing query: " + error);      
    }
  }