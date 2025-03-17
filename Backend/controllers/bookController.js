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
    const { bookId, userId } = req.body;

    // Find the transaction where the book was issued
    const transaction = await Transaction.findOne({
      book: bookId,
      user: userId,
      returnDate: null, // Ensure it's not already returned
    });

    if (!transaction) {
      return res.status(404).json({ message: "No active transaction found for this book" });
    }

    const returnDate = new Date();
    let fineAmount = 0;

    // Calculate fine if overdue
    if (returnDate > transaction.dueDate) {
      const overdueDays = Math.ceil((returnDate - transaction.dueDate) / (1000 * 60 * 60 * 24));
      fineAmount = overdueDays * 5; // Example: $5 per day
    }

    // Update transaction details
    transaction.returnDate = returnDate;
    transaction.fineAmount = fineAmount;
    transaction.finePaid = fineAmount === 0; // Mark fine as paid if none

    await transaction.save();

    // Increase the book's available copies
    await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: 1 } });

    res.status(200).json({ success: true, message: "Book returned successfully", transaction });

  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
};



module.exports = {deleteBook , getBookById , addBook , getBooks , updateBook , returnBook}
