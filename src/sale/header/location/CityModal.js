import React from "react";
import { Button, Modal } from "react-bootstrap";
import CityButton from "./CityButton";
import "./CityModal.css";

export default function CityModal({
    city,
    locationModal
}) {

    return (

        <Modal
            className="app-right-to-left city-modal"
            show={locationModal.citiesModalShow}
            onHide={locationModal.handleCitiesClose}
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>
                    انتخاب شهر
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                {
                    city.tempSelectedCities.length > 0 && (

                        <div className="selected-cities-box">

                            <div className="selected-cities-header">
                                <button
                                    type="button"
                                    className="clear-all-button"
                                    onClick={city.onClearCities}
                                >
                                    پاک کردن همه
                                </button>

                            </div>

                            <div className="selected-cities-list">

                                {
                                    city.tempSelectedCities.map(item => (

                                        <div
                                            key={item.id}
                                            className="selected-city-chip"
                                        >

                                            <span>
                                                {item.name}
                                            </span>

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

                {
                    city.loadingCities ?

                        <div className="text-center py-4">
                            در حال دریافت شهرها...
                        </div>

                        :

                        Array.isArray(city.cities) &&

                        city.cities.map(item => {

                            const found =
                                (city.tempSelectedCities ?? []).some(
                                    element => element.id === item.id
                                );

                            return (

                                <CityButton
                                    key={item.id}
                                    city={item}
                                    value={found}
                                    onCityAdded={city.onCityAdded}
                                    onCityRemoved={city.onCityRemoved}
                                />

                            );
                        })
                }

            </Modal.Body>

            <Modal.Footer>

                <Button
                    className="city-confirm-button"
                    onClick={() => {
                        city.confirmCities();
                        locationModal.handleCitiesClose();
                    }}
                >
                    تایید
                </Button>

                <Button
                    className="city-cancel-button"
                    onClick={locationModal.handleCitiesClose}
                >
                    انصراف
                </Button>

            </Modal.Footer>

        </Modal>
    );
}
