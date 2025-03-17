// const Transaction = require("../models/Transaction");
const Transaction =  require("../models/Transation");
const issueBook = async (req, res) => {
    try {
        const { userId, bookId, issueDate } = req.body;
        const returnDate = new Date(issueDate);
        returnDate.setDate(returnDate.getDate() + 15);

        const transaction = new Transaction({
            userId, bookId, issueDate, returnDate,
            finePaid: false
        });
        await transaction.save();
        res.json({ message: "Book issued successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Error issuing book", error });
    }
};

const returnBook = async (req, res) => {
    try {
        const { transactionId, returnDate } = req.body;
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });
        transaction.returnDate = returnDate;
        transaction.finePaid = returnDate > transaction.returnDate ? false : true;
        await transaction.save();
        res.json({ message: "Book returned successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Error returning book", error });
    }
};

module.exports = {issueBook ,  returnBook}