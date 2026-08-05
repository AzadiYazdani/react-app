import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./ProvinceModal.css";

export default function ProvinceModal({
    city,
    locationModal
}) {
    const [search, setSearch] = useState("");
    const provinces = Array.isArray(city.provinces)
        ? city.provinces
        : [];

console.log("PROVINCES IN MODAL:", city.provinces);
console.log("PROVINCES LENGTH:", provinces.length);

    const filteredProvinces = provinces.filter(province =>
        (province.name || "")
            .toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    const handleProvinceClick = (provinceId) => {
        locationModal.handleCitiesShow(provinceId);
    };

    return (

<Modal
    show={locationModal.provincesModalShow}
    onHide={locationModal.handleProvincesClose}
    centered
    dir="rtl"
    className="province-modal"
>
    <Modal.Header closeButton>
        <Modal.Title>
            انتخاب استان
        </Modal.Title>
    </Modal.Header>

    <Modal.Body>
        <div className="province-search">
            <i className="bi bi-search"></i>
            <input
                type="text"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="جستجو در استان‌ها"
            />
        </div>

        {
            city.selectedCities.length > 0 && (

                <div className="selected-cities-box">

                    <div className="selected-cities-header">

                        <span className="selected-title">
                            یک شهر را انتخاب کنید
                        </span>

                        <button
                            type="button"
                            className="clear-all-button"
                            onClick={city.clearSelectedCities}
                        >
                            پاک کردن همه
                        </button>

                    </div>

                    <div className="selected-cities-list">

                        {
                            city.selectedCities.map(item => (

                                <div
                                    key={item.id}
                                    className="selected-city-chip"
                                >
                                    <span>{item.name}</span>

                                    <button
                                        type="button"
                                        className="remove-city-button"
                                        onClick={() => city.onCityRemoved(item)}
                                    >
                                        ×
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                </div>

            )
        }

        <div className="province-list">
            {city.loadingProvinces ? (
                <div className="province-empty">
                    در حال دریافت استان‌ها...
                </div>

            ) : filteredProvinces.length === 0 ? (
                <div className="province-empty">
                    استانی پیدا نشد
                </div>
            ) : (

                filteredProvinces.map(province=>(
                    <button key={province.id} className="province-item" onClick={()=>handleProvinceClick(province.id)} >
                        <span>
                            {province.name}
                        </span>
                        <i className="bi bi-chevron-left"></i>
                    </button>
                ))
            )}
        </div>
    </Modal.Body>

    <Modal.Footer>
        <button className="province-confirm" disabled>
            تأیید
        </button>
        <button className="province-cancel" onClick={locationModal.handleProvincesClose}>
            انصراف
        </button>
    </Modal.Footer>
</Modal>
    );
}
