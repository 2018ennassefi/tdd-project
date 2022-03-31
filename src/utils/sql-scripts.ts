import { Database } from "sqlite";
import sqlite3 from "sqlite3";

export const createUsersTable = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
  await db.exec('CREATE TABLE IF NOT EXISTS user (id varchar, username varchar)');
};

export const clearUsersTable = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
  await db.run('DELETE FROM user');
};

export const createRecipesTable = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
  await db.exec('CREATE TABLE IF NOT EXISTS recipes (id varchar, name varchar, ingredients varchar, creator varchar)');
};
export const clearRecipesTable = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
  await db.run('DELETE FROM recipes');
};