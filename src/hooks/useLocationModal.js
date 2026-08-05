import { useState } from "react";

export default function useLocationModal(loadProvinces, loadCities) {

    const [provincesModalShow, setProvincesModalShow] = useState(false);
    const [citiesModalShow, setCitiesModalShow] = useState(false);


    // =========================
    // باز کردن استان‌ها
    // =========================

    const handleProvincesShow = async () => {

        await loadProvinces();

        setProvincesModalShow(true);
    };


    // =========================
    // بستن استان‌ها
    // =========================

    const handleProvincesClose = () => {
        setProvincesModalShow(false);
    };


    // =========================
    // انتخاب استان و دریافت شهرها
    // =========================

    const handleCitiesShow = async (provinceId) => {

        await loadCities(provinceId);

        setProvincesModalShow(false);
        setCitiesModalShow(true);
    };


    // =========================
    // بستن شهرها
    // =========================

    const handleCitiesClose = () => {
        setCitiesModalShow(false);
    };

    // =========================
    // تایید شهرها
    // =========================
    const submitCities = () => {
        setCitiesModalShow(false);
    };

    return {

        provincesModalShow,
        citiesModalShow,

        handleProvincesShow,
        handleProvincesClose,

        handleCitiesShow,
        handleCitiesClose,

        submitCities
    };
}
