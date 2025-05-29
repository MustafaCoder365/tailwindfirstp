// src/pages/user/index.jsx
import React, { useState, useEffect } from 'react';
import {
  FaUpload,
  FaShoppingCart,
  FaBell,
  FaCommentDots,
  FaStar,
  FaSignOutAlt
} from 'react-icons/fa';

export default function UserHome() {
  const [activeSection, setActiveSection] = useState('upload');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [ratings, setRatings] = useState({});
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: null
  });

  useEffect(() => {
    // 🔐 TEMPORARY AUTH BYPASS FOR DEVELOPMENT ONLY
    // This block disables auth redirect while backend is not yet connected.
    // Remove or comment this out when integrating with real authentication.
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (import.meta.env.PROD) {
      if (!token || role !== 'user') {
        window.location.href = '/login/user';
      }
    } else {
      if (!token) {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('role', 'user');
      }
    }
  }, []);

  useEffect(() => {
    setProducts([
      { id: 1, title: 'Product A', price: 50, stock: 5 },
      { id: 2, title: 'Product B', price: 75, stock: 0 },
      { id: 3, title: 'Product C', price: 100, stock: 2 }
    ]);
  }, []);

  useEffect(() => {
    setCart(prev =>
      prev.filter(item => {
        const prod = products.find(p => p.id === item.id);
        return prod && prod.stock > 0;
      })
    );
  }, [products]);

  const handleUpload = e => {
    e.preventDefault();
    const nextId = products.length + 1;
    setProducts(ps => [
      ...ps,
      { id: nextId, title: newProduct.title, price: Number(newProduct.price), stock: 10 }
    ]);
    setNewProduct({ title: '', price: '', description: '', image: null });
    setNotifications(n => [
      ...n,
      { id: Date.now(), message: 'Your product upload is pending approval.' }
    ]);
  };

  const handleOrder = prodId => {
    const prod = products.find(p => p.id === prodId);
    if (!prod || prod.stock < 1) return;
    setProducts(ps =>
      ps.map(p => (p.id === prodId ? { ...p, stock: p.stock - 1 } : p))
    );
    setCart(c => [...c, { id: prod.id, title: prod.title }]);
    setNotifications(n => [
      ...n,
      { id: Date.now(), message: `Order for "${prod.title}" accepted.` }
    ]);
  };

  const handleRate = (prodId, value) => {
    setRatings(r => ({ ...r, [prodId]: value }));
  };

  const handleComplaint = text => {
    setComplaints(c => [...c, { id: Date.now(), text }]);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white shadow p-4 space-y-4">
        <button onClick={() => setActiveSection('upload')} className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded">
          <FaUpload /> Upload Product
        </button>
        <button onClick={() => setActiveSection('order')} className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded">
          <FaShoppingCart /> Order Product
        </button>
        <button onClick={() => setActiveSection('notifications')} className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded">
          <FaBell /> Notifications
        </button>
        <button onClick={() => setActiveSection('cart')} className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded">
          <FaShoppingCart /> Cart ({cart.length})
        </button>
        <button onClick={() => setActiveSection('complaints')} className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded">
          <FaCommentDots /> Complaints & Ratings
        </button>
        <button onClick={handleLogout} className="flex items-center gap-2 w-full p-2 text-red-600 hover:bg-red-100 rounded mt-4">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeSection === 'upload' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Upload a New Product</h2>
            <form onSubmit={handleUpload} className="space-y-4 bg-white p-4 rounded shadow">
              <input
                type="text"
                placeholder="Title"
                value={newProduct.title}
                onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="file"
                onChange={e => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                className="w-full"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Upload
              </button>
            </form>
          </section>
        )}

        {activeSection === 'order' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Order Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(prod => (
                <div key={prod.id} className="bg-white p-4 rounded shadow flex flex-col">
                  <h3 className="font-semibold">{prod.title}</h3>
                  <p className="text-gray-600">${prod.price}</p>
                  <p className={`mt-2 ${prod.stock < 1 ? 'text-red-600' : 'text-green-600'}`}>
                    {prod.stock < 1 ? 'Out of Stock' : `In Stock: ${prod.stock}`}
                  </p>
                  <button
                    disabled={prod.stock < 1}
                    onClick={() => handleOrder(prod.id)}
                    className="mt-auto bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    Order
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'notifications' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <ul className="space-y-2">
              {notifications.map(n => (
                <li key={n.id} className="bg-white p-3 rounded shadow flex items-center gap-2">
                  <FaBell className="text-yellow-500" /> {n.message}
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSection === 'cart' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map(item => (
                  <li key={item.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                    <span>{item.title}</span>
                    <button
                      onClick={() => setCart(c => c.filter(ci => ci.id !== item.id))}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeSection === 'complaints' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Complaints & Ratings</h2>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Send a Complaint</h3>
              <textarea
                onBlur={e => handleComplaint(e.target.value)}
                placeholder="Write your complaint..."
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <h3 className="font-semibold mb-2">Rate Products</h3>
            <div className="flex gap-4 mb-4">
              {products.map(prod => (
                <div key={prod.id} className="flex flex-col items-center">
                  <span>{prod.title}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(v => (
                      <FaStar
                        key={v}
                        onClick={() => handleRate(prod.id, v)}
                        className={`cursor-pointer ${
                          ratings[prod.id] >= v ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <h3 className="font-semibold mb-2">Your Complaints</h3>
            <ul className="space-y-2">
              {complaints.map(c => (
                <li key={c.id} className="bg-white p-3 rounded shadow flex items-center gap-2">
                  <FaCommentDots className="text-blue-500" /> {c.text}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
