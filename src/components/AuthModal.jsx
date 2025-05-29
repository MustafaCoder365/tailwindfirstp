import React, { useState } from 'react';
import { FaUser, FaStore, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function AuthModal({ isOpen, onClose }) {
  const [role, setRole] = useState('user');
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    file: null
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm(f => ({ ...f, file: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (mode === 'signup') {
      if (!form.name) errs.name = 'Name is required';
      if (form.password.length < 8) errs.password = 'Minimum 8 characters';
      if (form.password !== form.confirm) errs.confirm = 'Passwords must match';
      if (role === 'store' && !form.file) errs.file = 'Commercial record required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    const endpointBase = `/api/${role}`;
    const endpoint = mode === 'login' ? `${endpointBase}/login` : `${endpointBase}/register`;

    let payload;
    let headers = {};

    try {
      if (role === 'store' && mode === 'signup') {
        payload = new FormData();
        payload.append('name', form.name);
        payload.append('email', form.email);
        payload.append('password', form.password);
        payload.append('commercial_record', form.file);
      } else {
        payload = JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        });
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: payload
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || 'Login/Signup failed' });
        return;
      }

      const token = role === 'user'
        ? data.token
        : mode === 'login'
        ? data.data.token
        : null;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
      }

      alert(`${mode === 'login' ? 'Logged in' : 'Registered'} successfully as ${role}`);
      onClose();
    } catch (error) {
      console.error(error);
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-blue-100/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">غغ
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl p-6 space-y-5 overflow-y-auto max-h-[90vh]">
        {/* Role and Mode Switch */}
        <div className="flex space-x-2">
          <button onClick={() => setRole('user')} className={`flex-1 py-2 rounded ${role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            <FaUser className="inline mr-2" /> User
          </button>
          <button onClick={() => setRole('store')} className={`flex-1 py-2 rounded ${role === 'store' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            <FaStore className="inline mr-2" /> Store
          </button>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setMode('login')} className={`flex-1 py-2 border-b-2 ${mode === 'login' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>
            <FaSignInAlt className="inline mr-1" /> Login
          </button>
          <button onClick={() => setMode('signup')} className={`flex-1 py-2 border-b-2 ${mode === 'signup' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>
            <FaUserPlus className="inline mr-1" /> Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

          {mode === 'signup' && (
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-1" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-1" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-1" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label className="text-sm font-semibold">Confirm Password</label>
                <input name="confirm" type="password" value={form.confirm} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-1" />
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
              </div>

              {role === 'store' && (
                <div>
                  <label className="text-sm font-semibold">Commercial Record (PDF/Image)</label>
                  <input name="file" type="file" accept="image/*,.pdf" onChange={handleChange} className="w-full mt-1" />
                  {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                </div>
              )}
            </>
          )}

          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <button onClick={onClose} className="text-center text-sm text-gray-500 hover:underline w-full">
          Cancel
        </button>
      </div>
    </div>
  );
}
