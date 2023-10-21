const { client } = require('../db');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { GET_LAST_MONTH_BORROWS_REPORT_QUERY, GET_BORROWS_BY_TIMERANGE_REPORT_QUERY, GET_OVERDUE_BORROWS_REPORT_QUERY } = require('../utils/Constants');
const fs = require('fs');

// Get report for all borrowings of last month 
const getBorrowingReport = async (req, res) => {
    try {
        const currentMonth = new Date().getMonth();
        const query = GET_LAST_MONTH_BORROWS_REPORT_QUERY;
        values = [currentMonth]
        const result = await client.query(query, values);
        const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '');
        const filename = `all_borrowings_${timestamp}.csv`;
        const csvWriter = createCsvWriter({
            path: filename,
            header: [{ id: 'name', title: 'Borrower Name' },
            { id: 'title', title: 'Book Title' },
            { id: 'checkout_date', title: 'Checkout Date' },
            { id: 'due_date', title: 'Due Date' }],
        });
        await csvWriter.writeRecords(result.rows)
        // send the CSV file as an attachment in the response
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'text/csv');
        res.download(filename, (err) => {
            if (err) {
                // handle any errors that might occur during the download
                return res.status(500).json({ message: 'Error downloading the CSV', error: err.message });
            } else {
                // delete the file after it's sent
                fs.unlinkSync(filename);
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching borrows', error: error.message });
    }
};

// Get report for borrowings within a specific period
const getBorrowingReportDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const query = GET_BORROWS_BY_TIMERANGE_REPORT_QUERY;
        values = [startDate, endDate]
        const result = await client.query(query, values);
        const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '');
        const filename = `date_range_borrowings_${timestamp}.csv`;
        const csvWriter = createCsvWriter({
            path: filename,
            header: [{ id: 'name', title: 'Borrower Name' },
            { id: 'title', title: 'Book Title' },
            { id: 'checkout_date', title: 'Checkout Date' },
            { id: 'due_date', title: 'Due Date' }],
        });
        await csvWriter.writeRecords(result.rows);
        // send the CSV file as an attachment in the response
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'text/csv');
        res.download(filename, (err) => {
            if (err) {
                // handle any errors that might occur during the download
                return res.status(500).json({ message: 'Error downloading the CSV', error: err.message });
            } else {
                // delete the file after it's sent
                fs.unlinkSync(filename);
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching borrows', error: error.message });
    }
};


// Get report for overdue borrowings of last month 
const getOverdueBorrowingReport = async (req, res) => {
    try {
        const currentMonth = new Date().getMonth();
        const query = GET_OVERDUE_BORROWS_REPORT_QUERY;
        values = [currentMonth]
        const result = await client.query(query, values);
        const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '');
        const filename = `overdue_borrowings_${timestamp}.csv`;
        const csvWriter = createCsvWriter({
            path: filename,
            header: [{ id: 'name', title: 'Borrower Name' },
            { id: 'title', title: 'Book Title' },
            { id: 'checkout_date', title: 'Checkout Date' },
            { id: 'due_date', title: 'Due Date' }],
        });
        await csvWriter.writeRecords(result.rows);
        // send the CSV file as an attachment in the response
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'text/csv');
        res.download(filename, (err) => {
            if (err) {
                // handle any errors that might occur during the download
                return res.status(500).json({ message: 'Error downloading the CSV', error: err.message });
            } else {
                // delete the file after it's sent
                fs.unlinkSync(filename);
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching borrows', error: error.message });
    }
};

module.exports = {
    getBorrowingReport,
    getOverdueBorrowingReport,
    getBorrowingReportDateRange
};

