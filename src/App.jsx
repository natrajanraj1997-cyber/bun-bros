import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Plus, X, Trash2 } from 'lucide-react';

// --- ACTUAL MENU DATA ---
const menuItems = [
  { id: 1, name: "Classic Maska Bun", price: "₹50", desc: "The original. Soft, fluffy bun loaded with rich maska.", tag: "Signature" },
  { id: 2, name: "Rose Milk Maska", price: "₹60", desc: "Sweet, fragrant rose milk flavors packed into our toasted bun.", tag: "Popular" },
  { id: 3, name: "Chocolate Maska", price: "₹70", desc: "Warm bun generously filled with rich, gooey chocolate.", tag: "Indulgent" },
];

function App() {
  // --- REACT STATE ---
  const [cartItems, setCartItems] = useState([]); // Now stores an array of item objects
  const [isCartOpen, setIsCartOpen] = useState(false); // Controls the slide-out cart

  // --- CART LOGIC ---
  const handleAddToCart = (clickedItem) => {
    setCartItems(prevCart => {
      // Check if the item is already in the cart
      const existingItem = prevCart.find(item => item.id === clickedItem.id);
      
      if (existingItem) {
        // If it exists, just increase the quantity
        return prevCart.map(item => 
          item.id === clickedItem.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If it's new, add it to the array with a quantity of 1
        return [...prevCart, { ...clickedItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Calculate the total number of items and the total price
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => {
    const numericPrice = parseInt(item.price.replace('₹', ''));
    return total + (numericPrice * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fffbeb] relative overflow-x-hidden font-sans">
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center max-w-6xl mx-auto z-40">
        <div className="flex items-center">
          <img src="/logo.png" alt="Bun Bros Logo" className="h-16 md:h-20 drop-shadow-md hover:scale-105 transition-transform" />
        </div>
        
        <motion.button 
          key={cartCount} 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          onClick={() => setIsCartOpen(true)} // Opens the cart panel
          className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all font-bold text-gray-800 border-2 border-bun-light cursor-pointer"
        >
          <ShoppingBag size={20} className="text-bun-dark" />
          Cart ({cartCount})
        </motion.button>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex flex-col items-center text-center mt-36 px-6 max-w-3xl z-10 mb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-bun-light text-bun-dark px-4 py-1 rounded-full text-sm font-bold tracking-wide mb-6 uppercase border border-bun"
        >
          Maska Bun & Milk
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black mb-6 leading-tight text-gray-900 tracking-tight"
        >
          The Best Buns in <span className="text-bun-dark">Town.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl font-medium"
        >
          Handcrafted, perfectly toasted, and delivered hot. Grab your favorite Maska Bun right now.
        </motion.p>

        <motion.button
          onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#5c3a21] text-white px-8 py-4 rounded-full text-xl font-bold flex items-center gap-3 shadow-xl hover:bg-[#4a2e1a] transition-colors cursor-pointer"
        >
          Order Now
          <ArrowRight size={24} />
        </motion.button>
      </main>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="w-full max-w-6xl mx-auto px-6 pb-24 z-10">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-black text-[#5c3a21] tracking-tight">Today's Menu</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-2xl transition-all border-2 border-transparent hover:border-bun-light flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-bun-light text-bun-dark text-xs font-bold px-3 py-1 rounded-full">
                  {item.tag}
                </span>
                <span className="font-black text-2xl text-[#5c3a21]">{item.price}</span>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow font-medium">{item.desc}</p>
              
              {/* Pass the actual item object to the function now */}
              <button 
                onClick={() => handleAddToCart(item)}
                className="w-full flex items-center justify-center gap-2 bg-[#fffbeb] hover:bg-bun hover:text-white text-[#5c3a21] py-3 rounded-2xl font-bold transition-colors cursor-pointer group border border-[#fde68a]"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SLIDE-OUT CART PANEL --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Dark background overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 cursor-pointer"
            />
            
            {/* The Cart Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-50 p-6 flex flex-col"
            >
              {/* Cart Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-black text-[#5c3a21] flex items-center gap-2">
                  <ShoppingBag /> Your Order
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-gray-500 hover:text-gray-900 transition-colors">
                  <X size={24} />
                </button>
              </div>

               {/* Cart Items */}
              <div className="flex-grow overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-500 mt-10">
                    <p>Your cart is empty.</p>
                    <p className="text-sm mt-2">Grab a Maska Bun!</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-[#fffbeb] p-4 rounded-xl border border-bun-light">
                        <div>
                          <h4 className="font-bold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-black text-[#5c3a21]">₹{parseInt(item.price.replace('₹', '')) * item.quantity}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 cursor-pointer">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer / Total */}
              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-medium">Total Amount</span>
                  <span className="text-3xl font-black text-[#5c3a21]">₹{cartTotal}</span>
                </div>
                <button 
                  disabled={cartItems.length === 0}
                  className="w-full bg-[#5c3a21] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#4a2e1a] transition-colors cursor-pointer shadow-lg"
                >
                  Checkout Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;