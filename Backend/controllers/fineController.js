const Transaction = require("../models/Transaction");

exports.calculateFine = async (req, res) => {
    try {
        const { userId } = req.params;
        const overdueBooks = await Transaction.find({
            userId,
            returnDate: { $lt: new Date() },
            finePaid: false
        });
        let totalFine = overdueBooks.length * 5; // $5 per overdue book
        res.json({ overdueBooks, totalFine });
    } catch (error) {
        res.status(500).json({ message: "Error calculating fine", error });
    }
};

exports.payFine = async (req, res) => {
    try {
        const { transactionId } = req.body;
        await Transaction.findByIdAndUpdate(transactionId, { finePaid: true });
        res.json({ message: "Fine paid successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error processing fine payment", error });
    }
};