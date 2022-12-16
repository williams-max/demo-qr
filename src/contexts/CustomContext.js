import React, { cloneElement } from 'react';

import LoginContextProvider from './LoginContext';
import LoadingContextProvider from './LoadingContext';
import DialogContextProvider from './DialogContext';
import ToastContextProvider from "./ToastContext";

// to merge all providers
function ProviderComposer({ contexts, children }) {
    return contexts.reduce(
        (kids, parent) =>
            cloneElement(parent, {
                children: kids,
            }),
        children
    );
}

export default function CustomContextProvider({children}) {

    return (
        <ProviderComposer
            // add providers to array of contexts
            contexts={[
             
                <LoginContextProvider/>,
                <LoadingContextProvider/>,
                <DialogContextProvider/>,
                <ToastContextProvider/>
            ]}>

            {children}

        </ProviderComposer>
    );

}
