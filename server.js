const http = require('http');
const url = require('url');
const { getCompaniesRegisteredLastMonth, registerCompany } = require('./src/services/companyService');
const { getCompaniesWithTransactionsLastMonth } = require('./src/services/transactionService');

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    if (method === 'GET' && parsedUrl.pathname === '/companies/registered') {
        try {
            const companies = await getCompaniesRegisteredLastMonth();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(companies));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error fetching registered companies' }));
        }
    } 

    else if (method === 'GET' && parsedUrl.pathname === '/companies/transactions') {
        try {
            const companies = await getCompaniesWithTransactionsLastMonth();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(companies));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error fetching companies with transactions' }));
        }
    } 

    else if (method === 'POST' && parsedUrl.pathname === '/companies/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { tax_id, company_name } = JSON.parse(body);
                if (!tax_id || !company_name) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing required fields' }));
                    return;
                }

                const newCompany = await registerCompany(tax_id, company_name);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newCompany));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error registering company' }));
            }
        });
    } 

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));
