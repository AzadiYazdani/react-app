import { useState } from "react";

export default function useLocationModal(
    loadProvinces,
    beginEditingCities
) {

    const [provincesModalShow, setProvincesModalShow] =
        useState(false);

    const handleProvincesShow = async () => {

        await loadProvinces();

        if (beginEditingCities) {
            beginEditingCities();
        }

        setProvincesModalShow(true);
    };

    const handleProvincesClose = () => {
        setProvincesModalShow(false);
    };

    return {
        provincesModalShow,
        handleProvincesShow,
        handleProvincesClose
    };
}
