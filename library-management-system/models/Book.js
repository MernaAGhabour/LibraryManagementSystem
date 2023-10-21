
class Book {
    constructor(title, author, ISBN, availableQuantity, shelfLocation, isDeleted) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.availableQuantity = availableQuantity;
        this.shelfLocation = shelfLocation;
        this.isDeleted = isDeleted
    }


    getTitle() {
        return this.title;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    getAuthor() {
        return this.author;
    }

    setAuthor(newAuthor) {
        this.title = newAuthor;
    }

    getISBN() {
        return this.ISBN;
    }

    setISBN(newISBN) {
        this.title = newISBN;
    }

    getAvailableQuantity() {
        return this.availableQuantity;
    }

    setAvailableQuantity(newAvailableQuantity) {
        this.availableQuantity = newAvailableQuantity;
    }

    getShelfLocation() {
        return this.shelfLocation;
    }

    setShelfLocation(newShelfLocation) {
        this.shelfLocation = newShelfLocation;
    }

    getIsDeleted() {
        return this.isDeleted;
    }

    setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }

}

module.exports = Book;
