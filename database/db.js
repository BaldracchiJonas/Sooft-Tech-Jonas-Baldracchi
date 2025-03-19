const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.sqlite');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tax_id TEXT UNIQUE NOT NULL,
            company_name TEXT NOT NULL,
            registration_date TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            debit_account TEXT NOT NULL,
            credit_account TEXT NOT NULL,
            transaction_date TEXT NOT NULL,
            FOREIGN KEY (company_id) REFERENCES companies(id)
        )
    `);
});

module.exports = db;
