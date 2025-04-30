'use client';

import { useEffect, useState } from 'react';
import { FaCartPlus, FaDollarSign, FaCartArrowDown } from 'react-icons/fa'; // Import icons

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch products (data simulasi di sini)
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products'); // API yang berisi produk hiburan
      const data = await response.json();
      const productsWithStock = data.map(product => ({
        ...product,
        kuota: Math.floor(Math.random() * 5), // Menambahkan kuota stok secara acak
      }));
      setProducts(productsWithStock);
    };

    fetchProducts();
  }, []);

  // Fungsi untuk menambah item ke cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Fungsi untuk menghapus item dari cart
  const removeFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  // Fungsi untuk mengubah kuantitas produk
  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, Math.min(item.kuota, quantity)) } 
        : item
    ));
  };

  // Menghitung jumlah item dalam cart
  const getCartItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Fungsi untuk menuju halaman cart
  const goToCart = () => {
    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-600">Katalog Produk Hiburan</h1>
      
      {/* Cart UI */}
      <div className="fixed top-4 right-4 flex items-center justify-center gap-2 bg-pink-500 text-white py-2 px-4 rounded-full shadow-lg cursor-pointer" onClick={goToCart}>
        <FaCartArrowDown size={20} />
        <span className="font-bold">{getCartItemCount()} item(s)</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform duration-300 ease-in-out border border-purple-300">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-2xl font-semibold text-teal-600 mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Harga:</span> <FaDollarSign /> {product.price.toLocaleString('id-ID')}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Kuota:</span> {product.kuota} tersisa
            </p>
            
            {/* Tombol Add to Cart / Remove from Cart */}
            <button 
              className="bg-pink-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full mt-4 disabled:bg-gray-400"
              disabled={product.kuota === 0}
              onClick={() => {
                const existingProduct = cart.find(item => item.id === product.id);
                if (existingProduct) {
                  removeFromCart(product);
                } else {
                  addToCart(product);
                }
              }}
            >
              <FaCartPlus /> {cart.find(item => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
