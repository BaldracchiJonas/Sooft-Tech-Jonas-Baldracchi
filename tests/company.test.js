const { registerCompany, getCompaniesRegisteredLastMonth } = require('../src/services/companyService');

test('Should successfully register a company', async () => {
    const company = await registerCompany('20-12345678-9', 'Test Company');
    expect(company).toHaveProperty('id');
    expect(company.taxId).toBe('20-12345678-9');
});

test('Should retrieve companies registered in the last month', async () => {
    const companies = await getCompaniesRegisteredLastMonth();
    expect(Array.isArray(companies)).toBe(true);
});
