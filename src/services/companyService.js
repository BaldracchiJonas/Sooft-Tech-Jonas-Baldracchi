const db = require('../../database/db');
const dayjs = require('dayjs');

const getCompaniesRegisteredLastMonth = () => {
    const cutoffDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM companies WHERE registration_date >= ?`, [cutoffDate], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const registerCompany = (taxId, companyName) => {
    const registrationDate = dayjs().format('YYYY-MM-DD');
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO companies (tax_id, company_name, registration_date) VALUES (?, ?, ?)`, 
        [taxId, companyName, registrationDate], function(err) {
            if (err) reject(err);
            resolve({ id: this.lastID, taxId, companyName, registrationDate });
        });
    });
};

module.exports = { getCompaniesRegisteredLastMonth, registerCompany };
