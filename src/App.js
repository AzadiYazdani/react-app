import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/HomeLayout.css";

import React from "react";

import MainBody from "./sale/main/mainBody/MainBody";
import Header from "./sale/header/Header";
import Carousel from "./sale/banner/Carousel";
import Footer from "./sale/footer/Footer";

import useCities from "./hooks/useCities";
import useBusinessTypes from "./hooks/useBusinessTypes";
import useBusinessTypeModal from "./hooks/useBusinessTypeModal";
import useLocationModal from "./hooks/useLocationModal";


function App() {

    const city = useCities();

    const businessType = useBusinessTypes();

    const businessTypeModal = useBusinessTypeModal(
        businessType.beginBusinessTypeSelection,
        businessType.cancelBusinessTypeSelection,
        businessType.confirmBusinessTypeSelection
    );

    const locationModal = useLocationModal(
        city.loadProvinces
    );


    return (
        <div>

            <Header
                city={city}
                locationModal={locationModal}
                businessType={businessType}
                businessTypeModal={businessTypeModal}
            />

            <Carousel />

            <MainBody
                city={city}
                businessType={businessType}
            />

            <Footer />

        </div>
    );
}

export default App;
