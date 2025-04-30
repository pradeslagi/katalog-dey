'use client';

import { useState, useEffect } from 'react';
import { FaDollarSign, FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Mengambil data cart yang sudah ada di local storage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Simpan cart ke localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fungsi untuk menghapus item dari cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Fungsi untuk mengubah kuantitas produk
  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, Math.min(item.kuota, quantity)) } 
        : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-700">Detail Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Harga:</span> <FaDollarSign /> {item.price.toLocaleString('id-ID')}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Kuota:</span> {item.kuota} tersisa
            </p>
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                value={item.quantity} 
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
                min="1" 
                max={item.kuota}
                className="border p-2 rounded-lg"
              />
              <button 
                className="text-red-500" 
                onClick={() => removeFromCart(item.id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
