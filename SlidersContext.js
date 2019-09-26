import React, { useState } from 'react'

const SlidersContext = React.createContext([
    {},
    () => {},
]);

const SlidersProvider = ({children}) => {
    const [state, setState] = useState({
        amount: 3000,
        term: 5
    })
    return (
        <SlidersContext.Provider value={[
            state,
            setState,
        ]}>
            {children}
        </SlidersContext.Provider>
    );
};

export { SlidersContext, SlidersProvider }