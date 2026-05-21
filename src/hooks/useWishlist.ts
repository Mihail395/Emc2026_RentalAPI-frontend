import {useState} from "react";
import type {Accommodation} from "../api/types/Accommodation.ts";

const WISHLIST_KEY = "wishlist";

const useWishlist = () => {

    const [wishlist, setWishlist] = useState<Accommodation[]>(() => {
        try {
            const stored = localStorage.getItem(WISHLIST_KEY);
            return stored ? JSON.parse(stored) : [];

        } catch (_err) {
            return [];
        }
    });


    const saveWishlist = (updated: Accommodation[]) => {
        setWishlist(updated);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    };

    const addToWishlist = (accommodation: Accommodation) => {
        if (!wishlist.some(item => item.id === accommodation.id)) {
            saveWishlist([...wishlist, accommodation]);
        }
    };

    const removeFromWishlist = (id: number) => {
        saveWishlist(wishlist.filter(item => item.id !== id));
    };

    const isInWishlist = (id: number): boolean => {
        return wishlist.some(item => item.id === id);
    };

    const clearWishlist = () => {
        saveWishlist([]);
        localStorage.removeItem(WISHLIST_KEY);
    };

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
    };
};

export default useWishlist;