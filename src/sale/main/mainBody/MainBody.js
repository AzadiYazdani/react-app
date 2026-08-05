import React, { useMemo, useState } from "react";
import SaleCard from "../saleCard/SaleCard";
import SortOrder from "./SortOrder";
import "./MainBody.css";

export default function MainBody() {

    const [sort, setSort] = useState("relevance");

    const sales = [
        {
            imageUrl: "https://mdbootstrap.com/img/new/standard/nature/111.webp",
            title: "Fancy Products",
            type: "پوشاک زنانه",
            city: "تهران",
            place: "هفت حوض",
            oldPrice: 200000,
            newPrice: 180000,
            lowPrice: 40000,
            highPrice: 800000,
            lowPercent: 10,
            highPercent: 90,
            saleLength: 10,
            daysToEnd: 5,
            daysToStart: 0,
            status: "1",
            score: 5
        },
        {
            imageUrl: "https://mdbootstrap.com/img/new/standard/nature/111.webp",
            title: "ایران تریکو",
            type: "پوشاک زنانه",
            city: "تهران",
            place: "هفت حوض",
            oldPrice: 200000,
            newPrice: 150000,
            lowPrice: 30000,
            highPrice: 700000,
            lowPercent: 20,
            highPercent: 70,
            saleLength: 10,
            daysToEnd: 0,
            daysToStart: 0,
            status: "2",
            score: 4
        },
        {
            imageUrl: "https://mdbootstrap.com/img/new/standard/nature/111.webp",
            title: "برق لامع",
            type: "لوازم خانگی",
            city: "تهران",
            place: "هفت حوض",
            oldPrice: 400000,
            newPrice: 280000,
            lowPrice: 100000,
            highPrice: 900000,
            lowPercent: 30,
            highPercent: 80,
            saleLength: 10,
            daysToEnd: 4,
            daysToStart: 0,
            status: "1",
            score: 4
        },
        {
            imageUrl: "https://mdbootstrap.com/img/new/standard/nature/111.webp",
            title: "ال سی وایکیکی",
            type: "پوشاک زنانه",
            city: "تهران",
            place: "هفت حوض",
            oldPrice: 500000,
            newPrice: 300000,
            lowPrice: 50000,
            highPrice: 900000,
            lowPercent: 15,
            highPercent: 60,
            saleLength: 10,
            daysToEnd: 8,
            daysToStart: 0,
            status: "1",
            score: 3
        }
    ];

    const sortedSales = useMemo(() => {

        const result = [...sales];

        switch (sort) {

            case "discount":
                return result.sort(
                    (a, b) => b.highPercent - a.highPercent
                );

            case "lowestPrice":
                return result.sort(
                    (a, b) => a.newPrice - b.newPrice
                );

            case "highestPrice":
                return result.sort(
                    (a, b) => b.newPrice - a.newPrice
                );

            case "rating":
                return result.sort(
                    (a, b) => (b.score || 0) - (a.score || 0)
                );

            case "newest":
                return result;

            case "relevance":
            default:
                return result;
        }

    }, [sort]);


    return (
        <main className="main-body">

            {/* مرتب‌سازی */}
            <SortOrder
                sort={sort}
                onSortChange={setSort}
            />

            {/* کارت‌های حراج */}
            <div className="sale-cards-row">

                {sortedSales.map((sale, index) => (
                    <SaleCard
                        key={`${sale.title}-${index}`}
                        {...sale}
                    />
                ))}

            </div>

        </main>
    );
}
