class Borrowing {
    constructor(borrowerId, bookId, checkoutDate, dueDate, returnDate, isReturned) {
        this.borrowerId = borrowerId;
        this.bookId = bookId;
        this.checkoutDate = checkoutDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.isReturned = isReturned;
    }

    get borrowerId() {
        return this.borrowerId;
    }

    set borrowerId(newBorrowerId) {
        this.borrowerId = newBorrowerId;
    }

    get bookId() {
        return this.bookId;
    }

    set bookId(newBookId) {
        this.bookId = newBookId;
    }

    get checkoutDate() {
        return this.checkoutDate;
    }

    set checkoutDate(newCheckoutDate) {
        this.checkoutDate = newCheckoutDate;
    }

    get dueDate() {
        return this.dueDate;
    }

    set dueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    get returnDate() {
        return this.returnDate;
    }

    set returnDate(newReturnDate) {
        this.returnDate = newReturnDate;
    }

    get isReturned() {
        return this.isReturned;
    }

    set isReturned(newIsReturned) {
        this.isReturned = newIsReturned;
    }
}

module.exports = Borrowing;
