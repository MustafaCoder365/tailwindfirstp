// src/pages/store/index.jsx
import React, { useState, useEffect } from 'react';
import {
  FaTags,
  FaPlus,
  FaChartLine,
  FaUndo,
  FaBoxOpen,
  FaCommentDots,
  FaSignOutAlt
} from 'react-icons/fa';

export default function StoreHome() {
  const [activeSection, setActiveSection] = useState('categories');

  // 🔐 TEMPORARY AUTH BYPASS FOR DEVELOPMENT ONLY
  // This block injects mock auth so that /store loads immediately in dev.
  // Remove or comment out when real backend auth is implemented.
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (import.meta.env.PROD) {
      // في بيئة الإنتاج، تحقق من الـ token و role الحقيقي
      if (!token || role !== 'store') {
        window.location.href = '/login/store'; // إعادة التوجيه إلى صفحة تسجيل الدخول
      }
    } else {
      // في بيئة التطوير، إذا كان الـ token أو role مفقودًا، قم بتعيين قيم وهمية
      if (!token || role !== 'store') {
        localStorage.setItem('token', 'mock-store-token');
        localStorage.setItem('role', 'store');
      }
    }
  }, []);

  // Mock data
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, title: 'Smartphone', categoryId: 1, price: 299 },
    { id: 2, title: 'Novel', categoryId: 2, price: 19 }
  ]);
  const [salesReport, setSalesReport] = useState([]);
  const [returnsReport, setReturnsReport] = useState([]);
  const [complaints] = useState([]); // no setter needed for now

  // Forms
  const [newCategory, setNewCategory] = useState('');
  const [editCatId, setEditCatId] = useState(null);
  const [editCatName, setEditCatName] = useState('');

  const [newProduct, setNewProduct] = useState({
    title: '',
    categoryId: categories[0]?.id || null,
    price: ''
  });

  useEffect(() => {
    // simulate fetching reports
    setSalesReport([
      { id: 1, product: 'Smartphone', quantity: 20, revenue: 5980 },
      { id: 2, product: 'Novel', quantity: 50, revenue: 950 }
    ]);
    setReturnsReport([
      { id: 1, product: 'Smartphone', quantity: 2 },
      { id: 2, product: 'Novel', quantity: 1 }
    ]);
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    setCategories(c => [
      ...c,
      { id: Date.now(), name: newCategory.trim() }
    ]);
    setNewCategory('');
  };

  const handleEditCategory = () => {
    setCategories(c =>
      c.map(cat =>
        cat.id === editCatId ? { ...cat, name: editCatName } : cat
      )
    );
    setEditCatId(null);
    setEditCatName('');
  };

  const handleDeleteCategory = id => {
    setCategories(c => c.filter(cat => cat.id !== id));
  };

  const handleAddProduct = e => {
    e.preventDefault();
    const nextId = products.length + 1;
    setProducts(p => [
      ...p,
      {
        id: nextId,
        title: newProduct.title,
        categoryId: Number(newProduct.categoryId),
        price: Number(newProduct.price)
      }
    ]);
    setNewProduct({ title: '', categoryId: categories[0]?.id, price: '' });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white shadow p-4 space-y-4">
        <button
          onClick={() => setActiveSection('categories')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaTags /> Categories
        </button>
        <button
          onClick={() => setActiveSection('addProduct')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaPlus /> Add Product
        </button>
        <button
          onClick={() => setActiveSection('sales')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaChartLine /> Sales Report
        </button>
        <button
          onClick={() => setActiveSection('returns')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaUndo /> Returns Report
        </button>
        <button
          onClick={() => setActiveSection('products')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaBoxOpen /> Products
        </button>
        <button
          onClick={() => setActiveSection('complaints')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaCommentDots /> Complaints
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full p-2 text-red-600 hover:bg-red-100 rounded mt-4"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {activeSection === 'categories' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
            <div className="space-y-4">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between bg-white p-3 rounded shadow"
                >
                  {editCatId === cat.id ? (
                    <input
                      value={editCatName}
                      onChange={e => setEditCatName(e.target.value)}
                      className="border px-2 py-1 rounded flex-1"
                    />
                  ) : (
                    <span>{cat.name}</span>
                  )}
                  <div className="space-x-2">
                    {editCatId === cat.id ? (
                      <button
                        onClick={handleEditCategory}
                        className="text-green-600 hover:underline"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditCatId(cat.id);
                          setEditCatName(cat.name);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="New Category"
                  className="flex-1 border px-3 py-2 rounded"
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'addProduct' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form
              onSubmit={handleAddProduct}
              className="space-y-4 bg-white p-4 rounded shadow"
            >
              <input
                type="text"
                placeholder="Product Title"
                value={newProduct.title}
                onChange={e =>
                  setNewProduct(n => ({ ...n, title: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <select
                value={newProduct.categoryId}
                onChange={e =>
                  setNewProduct(n => ({ ...n, categoryId: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded"
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={e =>
                  setNewProduct(n => ({ ...n, price: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </form>
          </section>
        )}

        {activeSection === 'sales' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
            <div className="space-y-3">
              {salesReport.map(r => (
                <div
                  key={r.id}
                  className="bg-white p-3 rounded shadow flex justify-between"
                >
                  <span>{r.product}</span>
                  <span>
                    Qty: {r.quantity} | Revenue: ${r.revenue}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'returns' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Returns Report</h2>
            <div className="space-y-3">
              {returnsReport.map(r => (
                <div
                  key={r.id}
                  className="bg-white p-3 rounded shadow flex justify-between"
                >
                  <span>{r.product}</span>
                  <span>Returned: {r.quantity}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'products' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded shadow flex flex-col"
                >
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-gray-600">${p.price}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'complaints' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Complaints</h2>
            <ul className="space-y-2">
              {complaints.map((c, idx) => (
                <li
                  key={idx}
                  className="bg-white p-3 rounded shadow flex items-center gap-2"
                >
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
