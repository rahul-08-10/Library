const Transaction = require("../models/Transaction");
const User = require("../models/user");
const getIssuedBooksReport = async (req, res) => {
    try {
        const issuedBooks = await Transaction.find({ returnDate: null })
            .populate("bookId", "title author")
            .populate("userId", "name email");

        res.status(200).json({ success: true, data: issuedBooks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching issued books report", error });
    }
};

const getReturnedBooksReport = async (req, res) => {
    try {
        const returnedBooks = await Transaction.find({ returnDate: { $ne: null } })
            .populate("bookId", "title author")
            .populate("userId", "name email");

        res.status(200).json({ success: true, data: returnedBooks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching returned books report", error });
    }
};

const getPendingFinesReport = async (req, res) => {
    try {
        const pendingFines = await Transaction.find({ fineAmount: { $gt: 0 }, finePaid: false })
            .populate("bookId", "title author")
            .populate("userId", "name email");

        res.status(200).json({ success: true, data: pendingFines });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching pending fines report", error });
    }
};

module.exports = {
    getIssuedBooksReport,
    getReturnedBooksReport,
    getPendingFinesReport
};
