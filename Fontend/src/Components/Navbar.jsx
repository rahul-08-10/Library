import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    // Replace this with your actual authentication logic
    const isAdmin = true; // Example: should come from your auth context or state
    const logout = () => {
        // Add your logout logic here
    }

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-xl font-bold">
                            Library System
                        </Link>
                        
                        <div className="hidden md:flex space-x-4">
                            <Link to="/books" className="hover:text-blue-200 transition-colors">
                                Books
                            </Link>
                            
                            {isAdmin ? (
                                <>
                                    <Link to="/maintenance" className="hover:text-blue-200 transition-colors">
                                        Maintenance
                                    </Link>
                                    <Link to="/reports" className="hover:text-blue-200 transition-colors">
                                        Reports
                                    </Link>
                                    <Link to="/transactions" className="hover:text-blue-200 transition-colors">
                                        Transactions
                                    </Link>
                            </>
                            ) : (
                                <>
                                <Link to="/my-books" className="hover:text-blue-200 transition-colors">
                                    My Books
                                </Link>
                                <Link to="/reports" className="hover:text-blue-200 transition-colors">
                                    Reports
                                </Link>
                                <Link to="/transactions" className="hover:text-blue-200 transition-colors">
                                    Transactions
                                </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        
                            <button
                                onClick={logout}
                                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors"
                            >
                                Logout
                            </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar