import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    isAuthModalOpen: boolean;
    showAuthModal: () => void;
    hideAuthModal: () => void;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const showAuthModal = () => setIsAuthModalOpen(true);
    const hideAuthModal = () => setIsAuthModalOpen(false);

    // Trigger modal on first visit if not authenticated
    React.useEffect(() => {
        if (!isAuthenticated) {
            const timer = setTimeout(() => {
                showAuthModal();
            }, 1000); // Small delay for effect
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated]);

    const login = (email: string) => {
        console.log('Logging in user:', email);
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        // Modal will be closed via animation in the component before calling hideAuthModal
    };

    const logout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isAuthModalOpen,
                showAuthModal,
                hideAuthModal,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
