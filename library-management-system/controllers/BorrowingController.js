const { client } = require('../db');
const { addMonths, isValid } = require('date-fns');
const { IS_BORROWER_VALID_QUERY, IS_BOOK_IN_STOCK_QUERY, INSERT_NEW_BORROWING_QUERY, DECREMENT_BOOK_QUANTITY_QUERY, RETURN_BOOK_QUERY, INCREMENT_BOOK_QUANTITY_QUERY, GET_CHECKED_OUT_BOOKS_BY_BORROWER_ID_QUERY, LIST_OVERDUE_BOOKS_QUERY } = require('../utils/Constants');


// Checkout a book
const checkoutBook = async (req, res) => {
    try {
        const { borrowerId, bookId } = req.body;
        if (!borrowerId || !bookId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const currentDate = new Date();
        const dueDate = addMonths(currentDate, 1) //set due date after one month

        // check if borrower is valid and not deleted
        const query = IS_BORROWER_VALID_QUERY
        const values = [borrowerId];
        result = await client.query(query, values);
        isValidBorrower = (result.rows[0].result === 'true')
        if (isValidBorrower) {
            // check if book is not deleted and in stock
            const query = IS_BOOK_IN_STOCK_QUERY;
            const values = [bookId];
            result = await client.query(query, values);
            isValidBook = (result.rows[0].result === 'true')
            if (isValidBook == true) {
                // insert a new borrowing into borrowing table 
                const query = INSERT_NEW_BORROWING_QUERY;
                const values = [borrowerId, bookId, dueDate]
                const result = await client.query(query, values);
                const newBorrowing = result.rows[0];

                // decrement book available quantity
                const udpateBookQuery = DECREMENT_BOOK_QUANTITY_QUERY
                const udpateBookValues = [bookId]
                await client.query(udpateBookQuery, udpateBookValues);

                return res.status(201).json({ message: 'Borrower checked out book successfully', borrowing: newBorrowing });

            }
            else {
                return res.status(400).json({ message: 'Book deleted or out of stock' });
            }
        }
        else {
            return res.status(400).json({ message: 'Borrower deleted or does not exist' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error checking out', error: error.message });
    }
}

// Return a book
const returnBook = async (req, res) => {
    try {
        const { borrowerId, bookId } = req.body;
        if (!borrowerId || !bookId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        // update borrowing's return_date and is_returned for a checked-out book
        const query = RETURN_BOOK_QUERY;
        const values = [borrowerId, bookId];
        const result = await client.query(query, values);
        const updatedBorrowing = result.rows[0];
        if (result.rowCount > 0) {
            // increment book available quantity
            const udpateBookQuery = INCREMENT_BOOK_QUANTITY_QUERY
            const udpateBookValues = [bookId]
            await client.query(udpateBookQuery, udpateBookValues);

            return res.status(200).json({ message: 'Book returned successfully', updatedBorrowing: updatedBorrowing });

        }
        else {
            return res.status(400).json({ message: 'Book is already returned or does not exist' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error returning book', error: error.message });
    }
}

// Get currently checked out books for a borrower
const getCheckedOutBooks = async (req, res) => {
    try {
        const borrowerId = req.params.id;
        const query = GET_CHECKED_OUT_BOOKS_BY_BORROWER_ID_QUERY;
        const values = [borrowerId];
        const result = await client.query(query, values);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching borrowings', error: error.message });
    }
};

//Get all borrowings with overdue date
const listOverdueBorrowings = async (req, res) => {
    try {
        const query = LIST_OVERDUE_BOOKS_QUERY;
        const result = await client.query(query);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching borrowings', error: error.message });
    }
};

module.exports = {
    checkoutBook,
    returnBook,
    getCheckedOutBooks,
    listOverdueBorrowings
}