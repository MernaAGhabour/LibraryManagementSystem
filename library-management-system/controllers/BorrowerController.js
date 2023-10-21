const { client } = require('../db');
const { ADD_BORROWER_QUERY, UPDATE_BORROWER_QUERY, DELETE_BORROWER_QUERY, GET_ALL_BORROWERS_QUERY } = require('../utils/Constants');

// Add a new Borrower
const createBorrower = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const query = ADD_BORROWER_QUERY;
        const values = [name, email];
        const result = await client.query(query, values);
        const newBorrower = result.rows[0];
        return res.status(201).json({ message: 'Borrower created successfully', borrower: newBorrower });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating borrower', error: error.message });
    }
};

// Update a borrower by ID
const updateBorrower = async (req, res) => {
    const borrowerId = req.params.id;
    const { name, email } = req.body;

    try {
        const query = UPDATE_BORROWER_QUERY;
        const values = [name, email, borrowerId];
        const result = await client.query(query, values);
        const updatedBorrower = result.rows[0];
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Borrower not found' });
        }
        return res.status(200).json({ message: 'Borrower updated successfully', 'updatedBorrower': updatedBorrower });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating borrower', error: error.message });
    }
};

// Delete a borrower by ID
const deleteBorrower = async (req, res) => {
    const borrowerId = req.params.id;
    try {
        const query = DELETE_BORROWER_QUERY;
        const values = [borrowerId];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Borrower not found' });
        }
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting borrower', error: error.message });
    }
};

// Get all borrowers
const getAllBorrowers = async (req, res) => {
    try {
        const query = GET_ALL_BORROWERS_QUERY;
        const result = await client.query(query);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching borrowers', error: error.message });
    }
};

module.exports = {
    createBorrower,
    updateBorrower,
    deleteBorrower,
    getAllBorrowers
};

