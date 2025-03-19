# Company API (Pure Node.js + SQLite)

## **1. Install Dependencies**
After cloning the repository, install the necessary dependencies:
```sh
npm install
```

---

## **2. Database Setup**
### **2.1 Create Database and Tables**
The database and tables are automatically created when you run the API, but to manually initialize them:
```sh
node database/db.js
```

### **2.2 Seed Database with Dummy Data**
Run the following command to insert sample companies and transactions:
```sh
node database/seeder.js
```

---

## **3. Run the API Server**
```sh
npm run dev
```
The server will start at:
```
http://localhost:3000
```

---

## **4. API Endpoints**
### **4.1 Get Companies Registered Last Month**
- **URL:** `GET /companies/registered`
- **Response Example:**
```json
[
  {
    "id": 1,
    "cuit": "30-70789899-0",
    "company_name": "MercadoLibre",
    "registration_date": "2025-02-10"
  }
]
```

### **4.2 Get Companies with Transactions Last Month**
- **URL:** `GET /companies/transactions`
- **Response Example:**
```json
[
  {
    "id": 2,
    "cuit": "30-65987412-4",
    "company_name": "Globant",
    "registration_date": "2025-02-15"
  }
]
```

### **4.3 Register a New Company**
- **URL:** `POST /companies/register`
- **Request Body:**
```json
{
  "cuit": "30-12345678-9",
  "company_name": "NewTech Solutions"
}
```
- **Response Example:**
```json
{
  "id": 5,
  "taxId": "30-12345678-9",
  "companyName": "NewTech Solutions",
  "registrationDate": "2025-03-19"
}
```

---

## **5. Run Unit Tests**
```sh
npm test
```

---

## **6. Project Structure**
```
company-api/
│── database/
│   │── db.js          # Database initialization
│   │── seeder.js      # Inserts dummy data
│   │── database.sqlite # SQLite database file (auto-generated)
│── src/
│   │── services/
│   │   │── companyService.js     # Business logic for companies
│   │   │── transactionService.js # Business logic for transactions
│── tests/
│   │── company.test.js  # Unit tests
│── server.js           # HTTP server (Pure Node.js)
│── package.json        # Dependencies
│── README.md           # Project instructions
```

---

## **7. Notes**
- The database file (`database.sqlite`) will be generated automatically in the `database/` folder.
- All date comparisons are based on the **last month** from the current date.
- The server runs on **port 3000** by default.

---

## **8. Troubleshooting**
- If the database is not being created, make sure the `database/` folder exists:
  ```sh
  mkdir -p database
  ```
- If the API is not responding, check if the server is running:
  ```sh
  lsof -i :3000
  ```
- If you get a module not found error, reinstall dependencies:
  ```sh
  npm install
  ```

