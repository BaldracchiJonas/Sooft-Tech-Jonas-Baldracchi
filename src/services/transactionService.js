const db = require('../../database/db');
const dayjs = require('dayjs');

const getCompaniesWithTransactionsLastMonth = () => {
    const cutoffDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT DISTINCT c.*
            FROM companies c
            JOIN transactions t ON c.id = t.company_id
            WHERE t.transaction_date >= ?
        `, [cutoffDate], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

module.exports = { getCompaniesWithTransactionsLastMonth };
