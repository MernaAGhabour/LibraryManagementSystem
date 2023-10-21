const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');
const borrowerController = require('../controllers/BorrowerController');
const borrowingController = require('../controllers/BorrowingController');
const borrowReportingController = require('../controllers/BorrowingReportingController');




// Create a new book
router.post('/book', bookController.createBook);

// Update a book by ID
router.put('/book/:id', bookController.updateBook);

// Delete a book by ID
router.delete('/book/:id', bookController.deleteBook);

// Search for a book by title, author, or ISBN
router.get('/book/search', bookController.searchBooks);

// Get all books
router.get('/book', bookController.getAllBooks);

// Create a new borrower
router.post('/borrower', borrowerController.createBorrower);

// Update a borrower by ID
router.put('/borrower/:id', borrowerController.updateBorrower);

// Delete a borrow by ID
router.delete('/borrower/:id', borrowerController.deleteBorrower);

// Get all borrowers
router.get('/borrower', borrowerController.getAllBorrowers);

// Checkout a book 
router.post('/borrowing/checkout', borrowingController.checkoutBook);

// Return a borrowing
router.put('/borrowing/return', borrowingController.returnBook);


// Get Overdue borrowings
router.get('/borrowing/overdue', borrowingController.listOverdueBorrowings);

// Get Checked out borrowings for a borrower
router.get('/borrowing/:id', borrowingController.getCheckedOutBooks);

// Report overdue borrowings of last month
router.get('/report/borrowing-overdue', borrowReportingController.getOverdueBorrowingReport)

// Report all borrowings of last month
router.get('/report/borrowing', borrowReportingController.getBorrowingReport)

// Report borrowings of specific period
router.get('/report/borrowing-date', borrowReportingController.getBorrowingReportDateRange)

module.exports = router;
