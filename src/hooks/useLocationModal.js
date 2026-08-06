import { useState } from "react";

export default function useLocationModal(loadProvinces) {

    const [provincesModalShow, setProvincesModalShow] =
        useState(false);



    const handleProvincesShow = async () => {

        await loadProvinces();

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
