const { registerCompany, getCompaniesRegisteredLastMonth } = require('../src/services/companyService');
const { getCompaniesWithTransactionsLastMonth } = require('../src/services/transactionService');

test('Should successfully register a company', async () => {
    const company = await registerCompany('20-12345678-9', 'Test Company');
    expect(company).toHaveProperty('id');
    expect(company.taxId).toBe('20-12345678-9');
});

test('Should retrieve companies registered in the last month', async () => {
    const companies = await getCompaniesRegisteredLastMonth();
    expect(Array.isArray(companies)).toBe(true);
});

test('Should retrieve companies with transactions in the last month', async () => {
    const companies = await getCompaniesWithTransactionsLastMonth();
    expect(Array.isArray(companies)).toBe(true);
});

test('Should return 400 if required fields are missing when registering a company', async () => {
    const response = await fetch('http://localhost:3000/companies/register', {
        method: 'POST',
        body: JSON.stringify({ cuit: '20-12345678-9' }),
        headers: { 'Content-Type': 'application/json' },
    });

    const responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toBe('Missing required fields');
});

test('Should return 404 for invalid route', async () => {
    const response = await fetch('http://localhost:3000/invalid-route');
    const responseBody = await response.json();
    expect(response.status).toBe(404);
    expect(responseBody.error).toBe('Route not found');
});
