import React, { useEffect, useState, useRef } from 'react';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

interface Props {
    uiConfig: firebaseui.auth.Config;
    uiCallback?(ui: firebaseui.auth.AuthUI): void;
    firebaseAuth: Auth;
    className?: string;
}

const StyledFirebaseAuth = ({uiConfig, firebaseAuth, className, uiCallback}: Props) => {
    const [userSignedIn, setUserSignedIn] = useState(false);
    const elementRef = useRef(null);


    useEffect(() => {
        // Get or Create a firebaseUI instance.
        const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
        if (uiConfig.signInFlow === 'popup')
            firebaseUiWidget.reset();

        // We track the auth state to reset firebaseUi if the user signs out.
        const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
            if (!user && userSignedIn)
                firebaseUiWidget.reset();
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
            // if (firebaseUiWidget) {
            //     // Access properties or methods here
            //     firebaseUiWidget.reset();
            //   }
            firebaseUiWidget.reset();
        };
    }, [ uiConfig, firebaseAuth, uiCallback, userSignedIn ]);

    return <div className={className} ref={elementRef} />;
};

export default StyledFirebaseAuth;

