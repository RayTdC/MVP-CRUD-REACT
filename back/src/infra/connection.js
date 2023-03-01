import sqlite3 from "sqlite3"
import { open } from "sqlite"

export const getConnection = () => open({
    filename: './db.sqlite',
    driver: sqlite3.verbose().Database
})