import React from "react";
import "./SortOrder.css";

export default function SortOrder({ sort, onSortChange }) {

    const options = [
        {
            value: "relevance",
            label: "مرتبط‌ترین"
        },
        {
            value: "newest",
            label: "جدیدترین"
        },
        {
            value: "discount",
            label: "بیشترین تخفیف"
        },
        {
            value: "lowestPrice",
            label: "کمترین قیمت"
        },
        {
            value: "highestPrice",
            label: "بیشترین قیمت"
        },
        {
            value: "rating",
            label: "بالاترین امتیاز"
        }
    ];

    return (
        <div className="sort-order">

            <div className="sort-order-title">
                <i className="bi bi-sort-down"></i>
                <span>مرتب‌سازی:</span>
            </div>

            <div className="sort-order-options">
                {options.map(option => (
                    <button
                        key={option.value}
                        type="button"
                        className={
                            sort === option.value
                                ? "sort-option active"
                                : "sort-option"
                        }
                        onClick={() => onSortChange(option.value)} >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
