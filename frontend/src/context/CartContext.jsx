import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const cartKey = user ? `cartItems_${user._id}` : 'cartItems_guest';

    // 1. Initial load from localStorage (to show something immediately)
    useEffect(() => {
        const localItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCartItems(localItems);
        setLoading(false);
    }, [cartKey]);

    // 2. Sync with DB when user logs in
    useEffect(() => {
        const fetchAndSync = async () => {
            if (user) {
                try {
                    const localItems = JSON.parse(localStorage.getItem(`cartItems_${user._id}`)) || [];
                    const guestItems = JSON.parse(localStorage.getItem('cartItems_guest')) || [];

                    // Combine local + guest as a starting point for sync
                    const itemsToSync = [...localItems];
                    guestItems.forEach(gi => {
                        const exist = itemsToSync.find(x => x.medicine === gi.medicine);
                        if (!exist) itemsToSync.push(gi);
                    });

                    // Sync with DB
                    const { data } = await axios.post('/api/cart/sync', { items: itemsToSync }, { withCredentials: true });

                    const formattedItems = data.map(item => ({
                        medicine: item.medicine._id,
                        name: item.medicine.name,
                        image: item.medicine.imageUrl,
                        price: item.medicine.price,
                        qty: item.qty,
                        stock: item.medicine.stock
                    }));

                    setCartItems(formattedItems);
                    localStorage.setItem(`cartItems_${user._id}`, JSON.stringify(formattedItems));
                    localStorage.removeItem('cartItems_guest');
                } catch (error) {
                    console.error("Cart sync error", error);
                }
            }
        };
        if (user) fetchAndSync();
    }, [user]);

    const addToCart = async (medicine, qty = 1) => {
        const newItem = {
            medicine: medicine._id,
            name: medicine.name,
            image: medicine.imageUrl,
            price: medicine.price,
            qty,
            stock: medicine.stock
        };

        const exist = cartItems.find(x => x.medicine === medicine._id);
        let updatedItems;
        if (exist) {
            updatedItems = cartItems.map(x => x.medicine === medicine._id ? { ...newItem, qty } : x);
        } else {
            updatedItems = [...cartItems, newItem];
        }

        setCartItems(updatedItems);
        localStorage.setItem(cartKey, JSON.stringify(updatedItems));

        if (user) {
            try {
                await axios.post('/api/cart', { medicineId: medicine._id, qty }, { withCredentials: true });
            } catch (error) {
                console.error("Cart API error", error);
            }
        }
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeFromCart = async (id) => {
        const updatedItems = cartItems.filter(x => x.medicine !== id);
        setCartItems(updatedItems);
        localStorage.setItem(cartKey, JSON.stringify(updatedItems));

        if (user) {
            try {
                await axios.delete(`/api/cart/${id}`, { withCredentials: true });
            } catch (error) {
                console.error("Cart API remove error", error);
            }
        }
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const updateQty = async (id, qty) => {
        const updatedItems = cartItems.map(x => x.medicine === id ? { ...x, qty } : x);
        setCartItems(updatedItems);
        localStorage.setItem(cartKey, JSON.stringify(updatedItems));

        if (user) {
            try {
                await axios.put('/api/cart', { medicineId: id, qty }, { withCredentials: true });
            } catch (error) {
                console.error("Cart API update error", error);
            }
        }
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const clearCart = async () => {
        setCartItems([]);
        localStorage.removeItem(cartKey);
        if (user) {
            try {
                await axios.post('/api/cart/clear', {}, { withCredentials: true });
            } catch (error) {
                console.error("Cart API clear error", error);
            }
        }
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <CartContext.Provider value={{ cartItems, loading, addToCart, removeFromCart, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
