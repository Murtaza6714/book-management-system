// import sqlite from 'sqlite3'
// import path from 'path'
// import { logger } from './Logger';
// const sqlite3 = sqlite.verbose()

// export const db =  new sqlite3.Database(path.join(__dirname, "../db/sync_data.db"), (err) => {
//     if (err) {
//       logger.error(err.message)
//       return new Error(err.message);
//     }
//     logger.info("Connected to database !!")
//   });

import { Pool } from 'pg'

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASS,
  port: 5432, // or the port your database is running on
});