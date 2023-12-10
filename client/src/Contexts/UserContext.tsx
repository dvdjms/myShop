import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, db, getDoc, doc } from "../config/Firebase";

type UserContextType = {
    username: string | null;
    email: string | null;
    uid: string | null;
};

const UserContext = createContext<UserContextType | null>(null);

type UserProvderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProvderProps> = ({children}) => {
    const [user, setUser] = useState<UserContextType | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if(authUser) {
                try {
                    await new Promise(resolve => setTimeout(resolve, 500));
            //////////////////////////////////////////////////////////////////////////
            // not too happy about this timeout function. Need to find a better solution.
            // It's not fetching username in time. There's a delay when updating name.
            // Need a useAuth - perhaps a more secure way of handling access.
                    const userDoc = await getDoc(doc(db, 'users', authUser.uid));
                    const userData = userDoc.data();
                    setUser({
                        username: authUser.displayName,
                        email: authUser.email,
                        uid: authUser.uid,
                        ...userData,
                    });
                } catch (error) {
                    console.error('error fetching user data', error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);
    
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    // console.log("context", context)
    
    if (!context) {
        return {username: null, email: null, uid: null};
        // need to return an object for when user not signed in
        // throw new Error("useUser must be used within a UserProvider");
    };
    return context;
};




