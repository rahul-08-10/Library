const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  actualReturnDate: { type: Date },
  status: { type: String, enum: ["Issued", "Returned"], default: "Issued" },
  fineAmount: { type: Number, default: 0 },
  finePaid: { type: Boolean, default: false },
});

module.exports = mongoose.model("Transaction", transactionSchema);
