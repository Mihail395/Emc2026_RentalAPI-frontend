import {useContext} from "react";
import WishlistContext from "../context/WishlistContext.ts";

const useWishlistContext = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlistContext must be used within a WishlistProvider");
    }
    return context;
};

export default useWishlistContext;