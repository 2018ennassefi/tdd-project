import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { createRecipesTable, createUsersTable } from "src/utils/sql-scripts";

export const connectSQLite = async (filename: string): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  const db = await open({
    filename,
    driver: sqlite3.Database
  });

  return db;
};

export const createTables = async (db: Database<sqlite3.Database, sqlite3.Statement>): Promise<void> => {
  await Promise.all([
    createUsersTable(db),
    createRecipesTable(db)
  ]);
};

