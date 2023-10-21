const ADD_BOOK_QUERY = "INSERT INTO book (title, author, isbn, available_quantity, shelf_location) VALUES ($1, $2, $3, $4, $5) RETURNING *"
const GET_ALL_BOOKS_QUERY = "SELECT * FROM book where is_deleted != true"
const UPDATE_BOOK_QUERY = "UPDATE book SET title = $1, author = $2, isbn = $3, available_quantity = $4, shelf_location = $5 WHERE id = $6 and is_deleted != true RETURNING *"
const DELETE_BOOK_QUERY = "UPDATE book SET is_deleted = true WHERE id = $1"
const SEARCH_BOOK_BY_TITLE_QUERY = "SELECT * FROM book WHERE title = $1 and is_deleted != true"
const SEARCH_BOOK_BY_AUTHOR_QUERY = "SELECT * FROM book WHERE author = $1 and is_deleted != true"
const SEARCH_BOOK_BY_ISBN_QUERY = "SELECT * FROM book WHERE isbn = $1 and is_deleted != true"
const ADD_BORROWER_QUERY = "INSERT INTO borrower (name, email, registered_date) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *"
const UPDATE_BORROWER_QUERY = "UPDATE borrower SET name = $1, email = $2 WHERE id = $3 and is_deleted != true  RETURNING *"
const DELETE_BORROWER_QUERY = "UPDATE borrower SET is_deleted = true WHERE id = $1"
const GET_ALL_BORROWERS_QUERY = "SELECT * FROM borrower where is_deleted != true"
const IS_BORROWER_VALID_QUERY = "SELECT CASE WHEN EXISTS (SELECT 1 FROM borrower WHERE id = $1 AND is_deleted = false) THEN 'true' ELSE 'false' END AS result;"
const IS_BOOK_IN_STOCK_QUERY = "SELECT CASE WHEN EXISTS (SELECT 1 FROM book WHERE id = $1 AND is_deleted = false AND available_quantity > 0) THEN 'true' ELSE 'false' END AS result;"
const INSERT_NEW_BORROWING_QUERY = "INSERT INTO borrowing (borrower_id, book_id, due_date, checkout_date) VALUES ($1, $2, $3,CURRENT_TIMESTAMP) RETURNING *"
const DECREMENT_BOOK_QUANTITY_QUERY = "UPDATE book set available_quantity = available_quantity - 1 where id = $1"
const RETURN_BOOK_QUERY = "UPDATE borrowing SET return_date = CURRENT_TIMESTAMP, is_returned = true WHERE borrower_id = $1 AND book_id = $2 AND is_returned = false RETURNING *;"
const INCREMENT_BOOK_QUANTITY_QUERY = "UPDATE book set available_quantity = available_quantity + 1 where id = $1"
const GET_CHECKED_OUT_BOOKS_BY_BORROWER_ID_QUERY = "SELECT * FROM borrowing WHERE borrower_id = $1 AND is_returned != true"
const LIST_OVERDUE_BOOKS_QUERY = "SELECT * FROM borrowing WHERE due_date < CURRENT_TIMESTAMP AND is_returned !=true"
const GET_LAST_MONTH_BORROWS_REPORT_QUERY = "SELECT * FROM borrowing b join book bk on bk.id=b.book_id join borrower br on br.id=b.borrower_id WHERE EXTRACT(MONTH FROM checkout_date)  = $1"
const GET_BORROWS_BY_TIMERANGE_REPORT_QUERY = "SELECT * FROM borrowing b join book bk on bk.id=b.book_id join borrower br on br.id=b.borrower_id WHERE checkout_date BETWEEN $1 and $2"
const GET_OVERDUE_BORROWS_REPORT_QUERY = "SELECT * FROM borrowing b join book bk on bk.id=b.book_id join borrower br on br.id=b.borrower_id WHERE EXTRACT(MONTH FROM due_date)  = $1 AND (return_date IS NULL OR EXTRACT(MONTH FROM return_date) != $1)"

module.exports = {
    ADD_BOOK_QUERY,
    GET_ALL_BOOKS_QUERY,
    UPDATE_BOOK_QUERY,
    DELETE_BOOK_QUERY,
    SEARCH_BOOK_BY_TITLE_QUERY,
    SEARCH_BOOK_BY_AUTHOR_QUERY,
    SEARCH_BOOK_BY_ISBN_QUERY,
    ADD_BORROWER_QUERY,
    UPDATE_BORROWER_QUERY,
    DELETE_BORROWER_QUERY,
    GET_ALL_BORROWERS_QUERY,
    IS_BORROWER_VALID_QUERY,
    IS_BOOK_IN_STOCK_QUERY,
    INSERT_NEW_BORROWING_QUERY,
    DECREMENT_BOOK_QUANTITY_QUERY,
    RETURN_BOOK_QUERY,
    INCREMENT_BOOK_QUANTITY_QUERY,
    GET_CHECKED_OUT_BOOKS_BY_BORROWER_ID_QUERY,
    LIST_OVERDUE_BOOKS_QUERY,
    GET_LAST_MONTH_BORROWS_REPORT_QUERY,
    GET_BORROWS_BY_TIMERANGE_REPORT_QUERY,
    GET_OVERDUE_BORROWS_REPORT_QUERY
};