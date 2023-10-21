const { client } = require('../db');
const { ADD_BOOK_QUERY, GET_ALL_BOOKS_QUERY, UPDATE_BOOK_QUERY, DELETE_BOOK_QUERY, SEARCH_BOOK_BY_TITLE_QUERY, SEARCH_BOOK_BY_AUTHOR_QUERY, SEARCH_BOOK_BY_ISBN_QUERY } = require('../utils/Constants');


// Add a new book 
const createBook = async (req, res) => {
    const { title, author, ISBN, availableQuantity, shelfLocation } = req.body;
    if (!title || !author || !ISBN || !availableQuantity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const query = ADD_BOOK_QUERY;
        const values = [title, author, ISBN, availableQuantity, shelfLocation];
        const result = await client.query(query, values);
        const newBook = result.rows[0];
        return res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating book', error: error.message });
    }
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const query = GET_ALL_BOOKS_QUERY;
        const result = await client.query(query);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};


// Update a book by ID
const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const { title, author, ISBN, availableQuantity, shelfLocation } = req.body;
    try {
        const query = UPDATE_BOOK_QUERY;
        const values = [title, author, ISBN, availableQuantity, shelfLocation, bookId];
        const result = await client.query(query, values);
        const updatedBook = result.rows[0];
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book updated successfully', 'updatedBook': updatedBook });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    try {
        const query = DELETE_BOOK_QUERY;
        const values = [bookId];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(204).end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};


// Search for a book
const searchBooks = async (req, res) => {
    try {
        const { title, author, isbn } = req.body;
        const values = [];
        var query;
        if (title) { // Searching for book by title
            query = SEARCH_BOOK_BY_TITLE_QUERY
            values.push(title);
        }
        if (author) { // Searching for book by author
            query = SEARCH_BOOK_BY_AUTHOR_QUERY
            values.push(author);
        }
        if (isbn) { // Searching for book by isbn
            query = SEARCH_BOOK_BY_ISBN_QUERY
            values.push(isbn);
        }
        const result = await client.query(query, values);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error searching for book', error: error.message });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    searchBooks
};

