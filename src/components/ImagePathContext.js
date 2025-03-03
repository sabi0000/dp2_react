import React, { createContext, useContext, useState } from 'react';

// Vytvorenie kontextu
const ImagePathContext = createContext();

// Poskytovateľ kontextu
export const ImagePathProvider = ({ children }) => {
    const [imagePath, setImagePath] = useState(null);

    return (
        <ImagePathContext.Provider value={{ imagePath, setImagePath }}>
            {children}
        </ImagePathContext.Provider>
    );
};

// Vlastný hák na použitie kontextu
export const useImagePath = () => {
    return useContext(ImagePathContext);
};