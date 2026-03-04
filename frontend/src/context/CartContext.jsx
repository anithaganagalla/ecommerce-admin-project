import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id
            ? { ...x, qty: x.qty + 1 }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCartItems(
      cartItems.map((item) => {
        if (item._id === id) {
          const newQty =
            qty > item.countInStock ? item.countInStock : qty;
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};