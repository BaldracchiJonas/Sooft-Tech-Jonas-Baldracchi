const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.sqlite');

async function seedDatabase() {
    console.log('Clearing existing data...');
    await runQuery('DELETE FROM transactions;');
    await runQuery('DELETE FROM companies;');

    console.log('Seeding companies...');
    await runQuery(`INSERT INTO companies (id, cuit, company_name, registration_date) VALUES 
        (1, '30-70789899-0', 'MercadoLibre', '2025-03-10'),
        (2, '30-65987412-4', 'Globant', '2025-03-15');`);

    console.log('Seeding transactions...');
    await runQuery(`INSERT INTO transactions (company_id, amount, debit_account, credit_account, transaction_date) VALUES 
        (1, 5000, '123-456-789', '987-654-321', '2025-03-20'),
        (2, 10000, '222-333-444', '555-666-777', '2025-03-25');`);

    console.log('Database seeded successfully.');
    db.close();
}

function runQuery(query) {
    return new Promise((resolve, reject) => {
        db.run(query, function (err) {
            if (err) reject(err);
            else resolve();
        });
    });
}

seedDatabase().catch(err => {
    console.error('Error seeding database:', err);
    db.close();
});
