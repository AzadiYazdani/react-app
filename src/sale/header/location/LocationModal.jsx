import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CityButton from "./CityButton";
import "./LocationModal.css";


export default function LocationModal({
    city,
    locationModal
}) {


    const [search, setSearch] = useState("");



    useEffect(() => {

        if(locationModal.provincesModalShow){

            city.beginSelection();

            setSearch("");

            city.setStep("province");

        }

    }, [
        locationModal.provincesModalShow
    ]);





    const provinces = Array.isArray(city.provinces)
        ? city.provinces
        : [];




    const filteredProvinces =
        provinces.filter(item =>
            (item.name || "")
            .toLowerCase()
            .includes(
                search.trim().toLowerCase()
            )
        );




    const filteredCities =
        city.cities.filter(item =>
            (item.name || "")
            .toLowerCase()
            .includes(
                search.trim().toLowerCase()
            )
        );





    const handleProvinceClick = async (province)=>{


        city.setSelectedProvince(province);


        setSearch("");


        await city.loadCities(
            province.id
        );


        city.setStep("city");

    };






    const backToProvinces = ()=>{

        city.setStep("province");

        setSearch("");

    };







    const closeModal = ()=>{


        city.setStep("province");


        setSearch("");


        locationModal.handleProvincesClose();


    };







    const cancelModal = ()=>{


        city.cancelSelection();


        closeModal();


    };







    const confirmModal = ()=>{


        city.confirmSelection();


        closeModal();


    };








    return (

        <Modal

            show={
                locationModal.provincesModalShow
            }

            onHide={cancelModal}

            centered

            dir="rtl"

            className="province-modal"

        >



            <Modal.Header closeButton>


                <Modal.Title>

                    {
                        city.step === "city"

                        ?

                        city.selectedProvince?.name
                        ||
                        "انتخاب شهر"


                        :

                        "انتخاب استان"
                    }


                </Modal.Title>


            </Modal.Header>






            <Modal.Body>





                {
                    city.step === "city" &&


                    <div className="back-button-row">


                        <button

                            className="back-button"

                            onClick={backToProvinces}

                        >

                            <i className="bi bi-arrow-right"></i>

                            بازگشت به استان‌ها


                        </button>






                        {
                            city.tempSelectedCities.length > 0 &&


                            <button

                                className="clear-all-button"

                                onClick={
                                    city.clearTempCities
                                }

                            >

                                پاک کردن همه


                            </button>

                        }


                    </div>


                }









                {
                    city.tempSelectedCities.length > 0 &&


                    <div className="selected-cities-box">


                        <div className="selected-cities-list">



                            {
                                city.tempSelectedCities.map(item=>(


                                    <div

                                        key={item.id}

                                        className="selected-city-chip"

                                    >


                                        <span>

                                            {item.name}

                                        </span>



                                        <button

                                            className="remove-city-button"

                                            onClick={() =>
                                                city.removeCity(item)
                                            }

                                        >

                                            ×


                                        </button>



                                    </div>


                                ))
                            }



                        </div>


                    </div>


                }









                <div className="province-search">


                    <i className="bi bi-search"></i>


                    <input


                        type="text"


                        value={search}


                        onChange={
                            e=>setSearch(e.target.value)
                        }


                        placeholder={

                            city.step === "province"

                            ?

                            "جستجو در استان‌ها"

                            :

                            "جستجو در شهرها"

                        }


                    />


                </div>









                {
                    city.step === "province" &&


                    <div className="province-list">


                        {
                            filteredProvinces.map(province=>(


                                <button


                                    key={province.id}


                                    className="province-item"


                                    onClick={() =>
                                        handleProvinceClick(province)
                                    }


                                >


                                    <span>

                                        {province.name}

                                    </span>



                                    <i className="bi bi-chevron-left"></i>


                                </button>



                            ))
                        }


                    </div>


                }









                {
                    city.step === "city" &&


                    <div className="city-list">


                        {

                            city.loadingCities

                            ?

                            <div className="text-center">

                                در حال دریافت شهرها...

                            </div>


                            :


                            filteredCities.map(item=>(


                                <CityButton


                                    key={item.id}


                                    city={item}


                                    value={

                                        city.tempSelectedCities.some(

                                            x=>x.id===item.id

                                        )

                                    }



                                    onCityAdded={
                                        city.addCity
                                    }



                                    onCityRemoved={
                                        city.removeCity
                                    }


                                />


                            ))

                        }


                    </div>


                }




            </Modal.Body>









            <Modal.Footer>



                <button

                    className="province-confirm"

                    onClick={confirmModal}

                >

                    تایید


                </button>





                <button

                    className="province-cancel"

                    onClick={cancelModal}

                >

                    انصراف


                </button>




            </Modal.Footer>





        </Modal>

    );


}
