import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import "./SearchBar.css";

const suggestions = [
    "پوشاک زنانه",
    "پوشاک مردانه",
    "کفش",
    "کیف و کوله",
    "لوازم خانگی",
    "موبایل و لوازم جانبی",
    "لوازم آرایشی",
    "رستوران",
    "کافه",
    "طلا و جواهر",
    "فروشگاه اینترنتی",
    "حراج پوشاک",
    "حراج کفش",
    "حراج لوازم خانگی"
];

export default function SearchBar() {

    const [searchValue, setSearchValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchRef = useRef(null);

    const filteredSuggestions =
        searchValue.trim().length > 0
            ? suggestions.filter(item =>
                item.includes(searchValue.trim())
            )
            : suggestions.slice(0, 6);


    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);


    const handleChange = (event) => {

        const value = event.target.value;

        setSearchValue(value);
        setShowSuggestions(true);
    };


    const handleFocus = () => {
        setShowSuggestions(true);
    };


    const handleSuggestionClick = (suggestion) => {

        setSearchValue(suggestion);
        setShowSuggestions(false);
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        const value = searchValue.trim();

        if (!value) {
            return;
        }

        console.log("Search:", value);

        setShowSuggestions(false);
    };


    return (
        <div
            ref={searchRef}
            className="search-bar-container"
        >

            <Form
                className="search-bar"
                onSubmit={handleSubmit}
            >

                <i className="bi bi-search search-bar-icon"></i>

                <Form.Control
                    name="search"
                    type="search"
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="جستجوی فروشگاه، کسب‌وکار یا حراجی..."
                    aria-label="جستجو"
                    autoComplete="off"
                />

            </Form>


            {showSuggestions && filteredSuggestions.length > 0 && (

                <div className="search-suggestions">

                    <div className="search-suggestions-title">
                        <i className="bi bi-search"></i>
                        <span>پیشنهادهای جستجو</span>
                    </div>


                    {filteredSuggestions.map((item, index) => (

                        <button
                            key={index}
                            type="button"
                            className="search-suggestion-item"
                            onClick={() =>
                                handleSuggestionClick(item)
                            }
                        >

                            <i className="bi bi-search"></i>

                            <span>{item}</span>

                        </button>

                    ))}

                </div>

            )}

        </div>
    );
}
