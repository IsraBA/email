import { createContext, useContext, useState } from "react";

const HighlightContext = createContext();

export const useSearchHighlight = () => useContext(HighlightContext);

export const SearchHighlightProvider = ({ children }) => {
    const [highlightText, setHighlightText] = useState('');

    return (
        <HighlightContext.Provider value={{ highlightText, setHighlightText }}>
            {children}
        </HighlightContext.Provider>
    );
};

