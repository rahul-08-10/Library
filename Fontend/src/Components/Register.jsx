import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (role) => {
        setFormData(prev => ({
            ...prev,
            role
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            if (data.role === "admin") {
                navigate("/admin/dashboard");
            }
            else {
            navigate("/user/dashboard");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Library Management System
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Register for an account
                    </p>
                </div>
                {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2> */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button type="button" onClick={() => handleRoleChange('user')} className={`px-4 py-2 rounded-md ${formData.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>User</button>
                    <button type="button" onClick={() => handleRoleChange('admin')} className={`px-4 py-2 rounded-md ${formData.role === 'admin' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Admin</button>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                    <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Register</button>
                </form>
                <div className="signup-link" style={{ marginTop: '20px', textAlign: 'center' }}>
                    Already registered? <Link to="/">Login now</Link>
                </div>
            </div>
        </div>
    );
};

export default Register