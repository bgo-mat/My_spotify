import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState("");
    const updateData = (newData) => {
        setSearch(newData);
    };

    const updateResult = (newData) => {
        setResult(newData);
    };

    return (
        <MyContext.Provider value={{ search, updateData, updateResult, result }}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext);