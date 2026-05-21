import {createContext} from "react";
import type {Accommodation} from "../api/types/Accommodation.ts";

export interface WishlistContextType {
    wishlist: Accommodation[];
    addToWishlist: (accommodation: Accommodation) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export default WishlistContext;