import { useState } from "react";
import config from "../config/config";

export default function useCities() {

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);

    // شهرهای تایید شده
    const [selectedCities, setSelectedCities] = useState([]);

    // شهرهای انتخاب شده داخل مودال قبل از تایید
    const [tempSelectedCities, setTempSelectedCities] = useState([]);


    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);



    // =========================
    // دریافت استان‌ها
    // =========================

    const loadProvinces = async () => {

        setLoadingProvinces(true);

        try {

            const response = await fetch(
                "http://localhost:8081/location/provinces/all"
            );

            const data = await response.json();

            if (Array.isArray(data)) {
                setProvinces(data);
            }
            else if (Array.isArray(data.data)) {
                setProvinces(data.data);
            }
            else {
                setProvinces([]);
            }

        } catch(error) {

            console.error("loadProvinces:", error);
            setProvinces([]);

        } finally {

            setLoadingProvinces(false);

        }
    };



    // =========================
    // دریافت شهرها
    // =========================

    const loadCities = async (provinceId) => {

        setLoadingCities(true);

        try {

            const response = await fetch(
                `${config.API_BASE_URL}/location/provinces/${provinceId}/cities`
            );


            const data = await response.json();


            if (Array.isArray(data)) {
                setCities(data);
            }
            else if (Array.isArray(data.data)) {
                setCities(data.data);
            }
            else {
                setCities([]);
            }


            setSelectedProvince(
                provinces.find(
                    province =>
                        province.id.toString() === provinceId.toString()
                ) || null
            );


            // انتقال انتخاب‌های تایید شده به حالت موقت
            setTempSelectedCities([...selectedCities]);


        } catch(error) {

            console.error("loadCities:", error);
            setCities([]);

        } finally {

            setLoadingCities(false);

        }
    };



    // =========================
    // افزودن موقت شهر
    // =========================

    const onCityAdded = (city) => {

        setTempSelectedCities(prev => {

            const exists = prev.some(
                item => item.id === city.id
            );

            if (exists) {
                return prev;
            }

            return [
                ...prev,
                city
            ];

        });

    };



    // =========================
    // حذف موقت شهر
    // =========================

    const onCityRemoved = (city) => {

        setTempSelectedCities(prev =>
            prev.filter(
                item => item.id !== city.id
            )
        );

    };



    // =========================
    // تایید انتخاب شهرها
    // =========================

    const confirmCities = () => {

        setSelectedCities([
            ...tempSelectedCities
        ]);

    };



    // =========================
    // لغو تغییرات مودال شهر
    // =========================

    const cancelCities = () => {

        setTempSelectedCities([
            ...selectedCities
        ]);

    };



    // =========================
    // پاک کردن انتخاب‌های موقت
    // (داخل مودال شهرها)
    // =========================

    const onClearCities = () => {

        setTempSelectedCities([]);

    };



    // =========================
    // پاک کردن شهرهای تایید شده
    // (داخل مودال استان‌ها)
    // =========================

    const clearSelectedCities = () => {

        setSelectedCities([]);

        setTempSelectedCities([]);

    };



    return {

        provinces,
        cities,

        selectedProvince,

        selectedCities,
        tempSelectedCities,

        loadingProvinces,
        loadingCities,


        loadProvinces,
        loadCities,


        onCityAdded,
        onCityRemoved,

        confirmCities,
        cancelCities,

        onClearCities,
        clearSelectedCities,


        numberOfCities: selectedCities.length
    };
}
