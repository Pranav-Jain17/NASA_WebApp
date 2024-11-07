// AppContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(10);
    const [totalImages, setTotalImages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://images-api.nasa.gov/search?media_type=image');
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setData(result.collection.items);
                setTotalImages(result.collection.items.length);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const searchImages = async (query) => {
        if (!query) return;
        setLoading(true);
        try {
            const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
            const result = await response.json();
            setData(result.collection.items);
            setTotalImages(result.collection.items.length);
            setCurrentPage(1); // Reset to the first page of results
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchImages(searchTerm);
    };

    const paginatedData = data.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

    const nextPage = () => {
        if (currentPage < Math.ceil(totalImages / imagesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <AppContext.Provider value={{ data: paginatedData, loading, error, searchTerm, handleSearchChange, handleSearchSubmit, currentPage, nextPage, prevPage, totalImages }}>
            {children}
        </AppContext.Provider>
    );
};
