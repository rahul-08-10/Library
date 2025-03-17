const Book = require("../models/book");
const Transaction = require("../models/Transation");
const addBook = async (req, res) => {
  try {
    const { title, author, isbn, category, totalCopies } = req.body;
    const book = new Book({ 
        title, 
        author, 
        isbn, 
        category, 
        totalCopies, 
        availableCopies: totalCopies 
    });

    await book.save();
    res.status(201).json({ 
        book ,
        message: "Book added successfully"
    });
  } 

  catch (error) {
    res.status(500).json({ 
        message: "Error adding book", error 
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, isbn, category, totalCopies } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, isbn, category, totalCopies, availableCopies: totalCopies },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};


const returnBook = async (req, res) => {
  try {
    const { bookId, userId, serialNo, returnDate } = req.body;

    if (!bookId || !userId || !serialNo || !returnDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await Transaction.findOne({
      book: bookId,
      user: userId,
      serialNo,
      returnDate: null, 
    });

    if (!transaction) {
      return res.status(404).json({ message: "No active issued record found for this book" });
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const issuedDate = new Date(transaction.issueDate).setHours(0, 0, 0, 0);
    const dueDate = new Date(transaction.dueDate).setHours(0, 0, 0, 0);
    const selectedReturnDate = new Date(returnDate).setHours(0, 0, 0, 0);

    if (selectedReturnDate < issuedDate) {
      return res.status(400).json({ message: "Return date cannot be before the issue date" });
    }
    let fine = 0;
    if (selectedReturnDate > dueDate) {
      const daysLate = Math.ceil((selectedReturnDate - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 5;
    }

    transaction.returnDate = selectedReturnDate;
    transaction.fineAmount = fine;
    await transaction.save();

    await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: 1 } });

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      transaction,
      fineAmount: fine,
      redirectTo: "/pay-fine", 
    });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
};


const issueBook = async (req, res) => {
  try {
    const { bookId, userId, issueDate, returnDate, remarks } = req.body;
    if (!bookId || !userId || !issueDate) {
      return res.status(400).json({ message: "Book ID, User ID, and Issue Date are required" });
    }
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedIssueDate = new Date(issueDate).setHours(0, 0, 0, 0);

    if (selectedIssueDate < today) {
      return res.status(400).json({ message: "Issue date cannot be earlier than today" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "No available copies of this book" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const maxReturnDate = new Date(issueDate);
    maxReturnDate.setDate(maxReturnDate.getDate() + 15);

    const selectedReturnDate = returnDate ? new Date(returnDate) : maxReturnDate;
    if (selectedReturnDate > maxReturnDate) {
      return res.status(400).json({ message: "Return date cannot exceed 15 days from issue date" });
    }

    const existingTransaction = await Transaction.findOne({
      book: bookId,
      user: userId,
      returnDate: null,
    });

    if (existingTransaction) {
      return res.status(400).json({ message: "This book is already issued to the user" });
    }

  
    const transaction = new Transaction({
      book: bookId,
      user: userId,
      issueDate: selectedIssueDate,
      dueDate: selectedReturnDate,
      remarks: remarks || "", 
    });

    await transaction.save();
    await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });

    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Error issuing book", error });
  }
};

module.exports = {deleteBook , getBookById , addBook , getBooks , updateBook , returnBook , issueBook}
