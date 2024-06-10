import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:8000/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data.categories))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSelect = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSearch = () => {
        let url = 'http://localhost:8000/api/products?search=' + searchTerm;
        if (selectedCategory) {
            url += '&category=' + selectedCategory;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // handle the data
            })
            .catch(error => console.error('Error:', error));

        setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <>
            <form>
                <select className="select-active" onChange={handleSelect}>
                    <option value="">All Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.id}>{category.category_name}</option>
                    ))}
                </select>
                <input
                    value={searchTerm}
                    onKeyDown={handleInput}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search"
                />
            </form>
        </>
    );
};

export default Search;