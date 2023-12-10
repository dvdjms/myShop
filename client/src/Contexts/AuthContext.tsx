import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/Firebase";

type AuthContextType = {
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProvideProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProvideProps> = ({children}) => {
    const [authState, setAuthState] = useState<AuthContextType | null>({
        isAuthenticated: false});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setAuthState({isAuthenticated: !!user});
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        return {isAuthenticated: false};
    };
    return context;
};