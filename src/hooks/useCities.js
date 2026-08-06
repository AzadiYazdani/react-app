import { useState } from "react";
import config from "../config/config";

export default function useCities() {

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);

    const [selectedCities, setSelectedCities] = useState([]);
    const [tempSelectedCities, setTempSelectedCities] = useState([]);

    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    const [step, setStep] = useState("province");

    // دریافت استان‌ها
    const loadProvinces = async () => {

        setLoadingProvinces(true);

        try {

            const response = await fetch(
                `${config.API_BASE_URL}/location/provinces/all`
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

        } catch (error) {

            console.error("loadProvinces:", error);
            setProvinces([]);

        } finally {

            setLoadingProvinces(false);

        }
    };



    // دریافت شهرهای یک استان
    const loadCities = async (provinceId) => {

        setLoadingCities(true);

        try {

            const response = await fetch(
                `${config.API_BASE_URL}/location/provinces/${provinceId}/cities`
            );

            const data = await response.json();

            let loadedCities = [];

            if (Array.isArray(data)) {
                loadedCities = data;
            }
            else if (Array.isArray(data.data)) {
                loadedCities = data.data;
            }

            setCities(loadedCities);

        } catch (error) {

            console.error("loadCities:", error);

            setCities([]);

        } finally {

            setLoadingCities(false);

        }

    };



    // افزودن شهر
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



    // حذف شهر
    const onCityRemoved = (city) => {

        setTempSelectedCities(prev =>
            prev.filter(
                item => item.id !== city.id
            )
        );

    };



    // تایید
    const confirmCities = () => {

        setSelectedCities([
            ...tempSelectedCities
        ]);

    };



    // پاک کردن همه داخل مودال
    const onClearCities = () => {
        setTempSelectedCities([]);
    };

    // پاک کردن کامل
    const clearSelectedCities = () => {
        setSelectedCities([]);
        setTempSelectedCities([]);
    };

    const beginSelection = () => {
        setTempSelectedCities([...selectedCities]);
    };

    const cancelSelection = () => {
        setTempSelectedCities([...selectedCities]);
    };

    return {

        provinces,
        cities,

        step,
        setStep,

        selectedProvince,
        setSelectedProvince,

        beginSelection,
        cancelSelection,

        selectedCities,
        tempSelectedCities,

        loadingProvinces,
        loadingCities,

        loadProvinces,
        loadCities,

        onCityAdded,
        onCityRemoved,

        confirmCities,

        onClearCities,
        clearSelectedCities,


        numberOfCities: selectedCities.length

    };

}
