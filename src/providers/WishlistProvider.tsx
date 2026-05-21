import type {ReactNode} from "react";
import WishlistContext from "../context/WishlistContext.ts";
import useWishlist from "../hooks/useWishlist.ts";

interface WishlistProviderProps {
    children: ReactNode;
}

const WishlistProvider = ({children}: WishlistProviderProps) => {
    const wishlistData = useWishlist();

    return (
        <WishlistContext.Provider value={wishlistData}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;