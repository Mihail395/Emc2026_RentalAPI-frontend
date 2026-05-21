import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import AuthProvider from "./providers/AuthProvider.tsx";
import WishlistProvider from "./providers/WishlistProvider.tsx";
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <WishlistProvider>
                <CssBaseline/>
                <App/>
            </WishlistProvider>
        </AuthProvider>
    </StrictMode>
)