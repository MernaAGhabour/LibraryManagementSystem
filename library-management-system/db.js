const { Client } = require('pg');



// Database client connection
const client = new Client({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'admin',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(error => console.error('Connection error', error));


// Create Book Table
const createBookTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS book (
                id serial PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                isbn VARCHAR(100) NOT NULL,
                available_quantity INT NOT NULL,
                shelf_location VARCHAR(50) NOT NULL,
                is_deleted BOOLEAN DEFAULT false
            );`;

        await client.query(query);
        console.log('Books table created or already exists.');
    } catch (error) {
        console.error('Error creating the book table:', error);
    }
};

//Create Borrower Table
const createBorrowerTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS borrower (
                id serial PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_deleted BOOLEAN DEFAULT false
            );`;

        await client.query(query);
        console.log('Borrowers table created or already exists.');
    } catch (error) {
        console.error('Error creating the borrower table:', error);
    }
};


// Create Borrowing Table
const createBorrowingTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS borrowing (
                id serial PRIMARY KEY,
                borrower_id INT REFERENCES borrower(id) NOT NULL,
                book_id INT REFERENCES book(id) NOT NULL,
                checkout_date DATE NOT NULL,
                due_date DATE NOT NULL,
                return_date DATE,
                is_returned BOOLEAN DEFAULT false
            );`;


        await client.query(query);
        console.log('Borrowing table created or already exists.');
    } catch (error) {
        console.error('Error creating the Borrowing table:', error);
    }
};

createBookTable();
createBorrowerTable();
createBorrowingTable();
module.exports = { client };
