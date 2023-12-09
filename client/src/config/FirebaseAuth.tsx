import React, { useEffect, useState, useRef } from 'react';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { signInUserFetch } from '../services/api';
import { useNavigate } from 'react-router-dom';
import 'firebaseui/dist/firebaseui.css';
import { db, doc, setDoc } from "../config/Firebase";


interface Props {
    uiConfig: firebaseui.auth.Config;
    uiCallback?(ui: firebaseui.auth.AuthUI): void;
    firebaseAuth: Auth;
    className?: string;
};

const FirebaseAuth = ({uiConfig, firebaseAuth, className, uiCallback}: Props) => {
    const [userSignedIn, setUserSignedIn] = useState(false);
    const elementRef = useRef(null);
    const navigate = useNavigate();

      useEffect(() => {
            // Get or Create a firebaseUI instance.
            const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
            if (uiConfig.signInFlow === 'popup')
                  firebaseUiWidget.reset();

            // We track the auth state to reset firebaseUi if the user signs out.
            const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, async (user) => {
                if (!user && userSignedIn) firebaseUiWidget.reset();
                if(user){
                const userUID: string | null = user.uid!;
                const userEmail: string | null = user.email!;
                const display_name: string | null = user.displayName!;
                const user_token = await user.getIdToken();

                await setDoc(doc(db, 'users', userUID), {
                    username: display_name,
                    email: userEmail,
                });

                signInUserFetch(user_token, userUID, display_name, userEmail);
                navigate("/");
                }

                setUserSignedIn(!!user);
            });

            // Trigger the callback if any was set.
            if (uiCallback)
                  uiCallback(firebaseUiWidget);

            // Render the firebaseUi Widget.
            // @ts-ignore
            firebaseUiWidget.start(elementRef.current, uiConfig);

            return () => {
                  unregisterAuthObserver();
                  firebaseUiWidget.reset();
            };
      }, [ uiConfig, firebaseAuth, uiCallback, userSignedIn, navigate ]);

      return <div className={className} ref={elementRef}></div> ;
};


export default FirebaseAuth;
