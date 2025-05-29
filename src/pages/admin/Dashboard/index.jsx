import {
  FaTachometerAlt,
  FaChartBar,
  FaUsers,
  FaStore,
  FaTags,
  FaCog,
  FaSignOutAlt,
  FaComments,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Furniture", value: 300 },
  { name: "Books", value: 200 },
  { name: "Clothes", value: 100 },
];
const COLORS = ["#1A237E", "#8BC34A", "#FFA07A", "#F2C464"];

const lineData = [
  { name: "Jan", users: 30 },
  { name: "Feb", users: 60 },
  { name: "Mar", users: 45 },
  { name: "Apr", users: 80 },
  { name: "May", users: 100 },
];

const complaintsData = [
  { id: 1, name: "Ali Ahmed", complaint: "The product arrived damaged." },
  { id: 2, name: "Sara Noor", complaint: "Late delivery and missing items." },
  { id: 3, name: "Omar Khalid", complaint: "The store ignored my messages." },
];

const initialCategories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Furniture" },
  { id: 3, name: "Clothing" },
  { id: 4, name: "Books" },
];

const storesData = [
  {
    id: 1,
    name: "Alpha Store",
    imageUrl: "/images/alpha-store.png",
    documentUrl: "/docs/alpha-store-document.pdf",
  },
  {
    id: 2,
    name: "Beta Mart",
    imageUrl: "/images/beta-mart.png",
    documentUrl: "/docs/beta-mart-document.pdf",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [viewComplaint, setViewComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [editId, setEditId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!categoryName.trim()) return;
    setCategories([
      ...categories,
      { id: categories.length + 1, name: categoryName.trim() },
    ]);
    setCategoryName("");
  };

  const handleEditCategory = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === editId ? { ...cat, name: categoryName } : cat
      )
    );
    setEditId(null);
    setCategoryName("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-[#1A237E] text-white p-4">
        <h2 className="text-lg font-bold">DASHBOARD</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-64 bg-[#1A237E] text-white p-6 md:rounded-r-3xl shadow-xl`}
      >
        <h2 className="hidden md:block text-2xl font-bold mb-6">DASHBOARD</h2>
        <nav className="space-y-4">
          <button
            className="flex items-center gap-2 hover:text-[#F2C464]"
            onClick={() => setActiveSection("dashboard")}
          >
            <FaTachometerAlt /> Dashboard
          </button>
          <button
            className="flex items-center gap-2 hover:text-[#F2C464]"
            onClick={() => setActiveSection("reports")}
          >
            <FaChartBar /> Reports
          </button>
          <div className="ml-2">
            <button className="flex items-center gap-2 hover:text-[#F2C464]">
              <FaUsers /> Users
            </button>
            <button
              className="flex items-center gap-2 text-sm text-gray-200 ml-6"
              onClick={() => setActiveSection("complaints")}
            >
              <FaComments /> Complaints
            </button>
          </div>
          <button
            className="flex items-center gap-2 hover:text-[#F2C464]"
            onClick={() => setActiveSection("stores")}
          >
            <FaStore /> Stores
          </button>
          <button
            className="flex items-center gap-2 hover:text-[#F2C464]"
            onClick={() => setActiveSection("categories")}
          >
            <FaTags /> Categories
          </button>
          <button className="flex items-center gap-2 hover:text-[#F2C464]">
            <FaCog /> Settings
          </button>
          <button
            className="flex items-center gap-2 hover:text-[#F2C464] w-full mt-4"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Log out
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-[#F7F7F7] min-h-screen">
        <header className="text-2xl font-semibold text-[#1A237E] bg-white p-6 rounded shadow mb-6">
          {activeSection === "dashboard"
            ? "Welcome to the Admin Dashboard"
            : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </header>

        {/* Dashboard */}
        {activeSection === "dashboard" && (
          <section className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold text-[#1A237E] mb-4">User Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold text-[#1A237E] mb-4">Product Categories</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {/* Complaints */}
        {activeSection === "complaints" && (
          <section className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold text-[#1A237E] mb-4">User Complaints</h3>
            {complaintsData.map((c) => (
              <div key={c.id} className="flex justify-between py-2 border-b">
                <span className="font-medium">{c.name}</span>
                <button
                  onClick={() => setViewComplaint(c)}
                  className="bg-[#1A237E] text-white px-3 py-1 rounded"
                >
                  View
                </button>
              </div>
            ))}
            {viewComplaint && (
              <div className="mt-4">
                <h4 className="font-bold text-[#1A237E]">{viewComplaint.name}'s Complaint</h4>
                <p className="mt-2">{viewComplaint.complaint}</p>
              </div>
            )}
          </section>
        )}

        {/* Stores */}
        {activeSection === "stores" && (
          <section className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold text-[#1A237E] mb-4">Stores</h3>
            {storesData.map((s) => (
              <div key={s.id} className="py-4 border-b space-y-2">
                <span className="font-medium block">{s.name}</span>
                {s.imageUrl && (
                  <img
                    src={s.imageUrl}
                    alt={`${s.name} Logo`}
                    className="h-24 object-contain"
                  />
                )}
                {s.documentUrl && (
                  <a
                    href={s.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Store Document
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Categories */}
        {activeSection === "categories" && (
          <section className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#1A237E]">Categories</h3>
              <input
                type="text"
                placeholder="Search..."
                className="border px-3 py-1 rounded"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <table className="w-full table-auto border">
              <thead className="bg-[#1A237E] text-white">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="border-b">
                    <td className="p-2">{cat.id}</td>
                    <td className="p-2">
                      {editId === cat.id ? (
                        <input
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        cat.name
                      )}
                    </td>
                    <td className="p-2 space-x-2">
                      {editId === cat.id ? (
                        <>
                          <button
                            onClick={handleEditCategory}
                            className="px-3 py-1 rounded bg-[#1A237E] text-white"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="px-3 py-1 rounded bg-gray-400 text-white"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setEditId(cat.id);
                            setCategoryName(cat.name);
                          }}
                          className="px-3 py-1 rounded bg-green-600 text-white"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex space-x-2">
              <input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="New Category"
                className="border px-3 py-1 rounded flex-1"
              />
              <button
                onClick={handleAddCategory}
                className="px-4 py-1 rounded bg-blue-600 text-white"
              >
                Add Category
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
