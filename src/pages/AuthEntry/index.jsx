import React, { useState } from "react";
import PublicNavbar from "../../components/PublicNavbar";
import AuthModal from "../../components/AuthModal";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";



export default function AuthEntry() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar onLoginClick={() => setShowModal(true)} />

      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-10"
        >
          Turn Your Unused Items into Cash
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {/* Card 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:-translate-y-1 transform transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
              alt="Defective Goods"
              className="h-16 mx-auto mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              Sell Defective Goods
            </h2>
            <p className="text-sm text-gray-600">
              Even items with flaws have value
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:-translate-y-1 transform transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046878.png"
              alt="Store Setup"
              className="h-16 mx-auto mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              Easy Store Setup
            </h2>
            <p className="text-sm text-gray-600">
              Ideal for works-co or shops
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:-translate-y-1 transform transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/709/709699.png"
              alt="Upload Photos"
              className="h-16 mx-auto mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              Upload Photos Easily
            </h2>
            <p className="text-sm text-gray-600">
              User-friendly interface
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:-translate-y-1 transform transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="By Governorate"
              className="h-16 mx-auto mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              By Governorate
            </h2>
            <p className="text-sm text-gray-600">
              Organize items by area
            </p>
          </motion.div>
        </motion.div>
      </div>

      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
