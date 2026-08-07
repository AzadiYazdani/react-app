import { useState } from "react";
import config from "../config/config";

export default function useCities() {

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);

    // شهرهای تایید شده
    const [selectedCities, setSelectedCities] = useState([]);

    // شهرهای انتخاب شده داخل مودال
    const [tempSelectedCities, setTempSelectedCities] = useState([]);

    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    const [step, setStep] = useState("province");


    // ---------------- استان‌ها ----------------

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

        }
        finally {

            setLoadingProvinces(false);

        }

    };



    // ---------------- شهرها ----------------

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


        }
        catch(error){

            console.error("loadCities:", error);
            setCities([]);

        }
        finally {

            setLoadingCities(false);

        }

    };



    // ---------------- شروع انتخاب ----------------

    const beginSelection = () => {

        setTempSelectedCities(
            [...selectedCities]
        );

    };



    // ---------------- اضافه کردن شهر ----------------

    const addCity = (city) => {


        setTempSelectedCities(prev => {


            if(
                prev.some(
                    item => item.id === city.id
                )
            ){
                return prev;
            }


            return [
                ...prev,
                city
            ];

        });


    };



    // ---------------- حذف شهر ----------------

    const removeCity = (city) => {


        setTempSelectedCities(prev =>
            prev.filter(
                item => item.id !== city.id
            )
        );


    };



    // ---------------- پاک کردن همه ----------------

    const clearTempCities = () => {

        setTempSelectedCities([]);

    };



    // ---------------- تایید مودال ----------------

    const confirmSelection = () => {

        setSelectedCities(
            [...tempSelectedCities]
        );

    };



    // ---------------- انصراف مودال ----------------

    const cancelSelection = () => {

        setTempSelectedCities(
            [...selectedCities]
        );

    };



    // ---------------- پاک کردن انتخاب نهایی ----------------

    const clearSelectedCities = () => {

        setSelectedCities([]);
        setTempSelectedCities([]);

    };



    return {


        // data

        provinces,
        cities,

        selectedCities,
        tempSelectedCities,


        selectedProvince,
        setSelectedProvince,


        step,
        setStep,


        // loading

        loadingProvinces,
        loadingCities,


        // api

        loadProvinces,
        loadCities,


        // modal

        beginSelection,
        confirmSelection,
        cancelSelection,


        // cities

        addCity,
        removeCity,
        clearTempCities,


        clearSelectedCities,


        numberOfCities:
            selectedCities.length

    };

}
