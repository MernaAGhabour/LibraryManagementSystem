class Borrower {
    constructor(name, email, registeredDate, isDeleted) {
        this.name = name;
        this.email = email;
        this.registeredDate = registeredDate;
        this.isDeleted = isDeleted
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getRegisteredDate() {
        return this.registeredDate;
    }

    setRegisteredDate(registeredDate) {
        this.registeredDate = registeredDate;
    }

    getIsDeleted() {
        return this.isDeleted;
    }

    setIsDeleted(isDeleted) {
        this.isDeleted = isDeleted;
    }
}

module.exports = Borrower;