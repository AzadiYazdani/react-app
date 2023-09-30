import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RightPane from "./sale/main/rightPane/RightPane";
import MainBody from "./sale/main/mainBody/MainBody";
import React, {useEffect, useState} from "react";
import Header from "./sale/header/Header";
import Carousel from "./sale/banner/Carousel";
import Footer from "./sale/footer/Footer";

function App() {


    // Show State modal

    const [statesModalShow, setStatesModalShow] = useState(false);

    const handleStatesClose = () => {
        setStatesModalShow(false);
        setCitiesModalShow(false);
    }
    const handleStatesShow = () => {
        setStatesModalShow(true);
    }


    // Show City modal

    const [citiesModalShow, setCitiesModalShow] = useState(false);

    const handleCitiesClose = () => {
        setStatesModalShow(true);
        setCitiesModalShow(false);
    }


    const [cities, setCities] = useState([]);

    const handleCitiesShow = async (id) => {
        try {
            const data = await (await fetch(`http://localhost:8081/location/states/${id}/cities`)).json();
            setCities(data);
        } catch (err) {
            console.log(err.message);
        }
        setStatesModalShow(false);
        setCitiesModalShow(true);
    }


    // Select Cities

    const [selectedCities, setSelectedCities] = useState([]);
    const [numberOfCities, setNumberOfCities] = useState("شهر");

    const onCityAdded = (id, title) => {
        let city = {"id": id, "title": title};
        const found = selectedCities.find(obj => {
            return obj.id === id;
        });
        if (!found) {
            selectedCities.push(city);
            setSelectedCities([...selectedCities]);
            updateNumberOfCities();
        }
    }

    const onCityRemoved = (checkedId, title) => {
        let city = {"id": checkedId, "title": title};

        let index = selectedCities.indexOf(city);
        if (index >= -1) {
            //Removing values from array
            selectedCities.splice(index, 1);
            setSelectedCities([...selectedCities]);
            updateNumberOfCities();
        }
    }

    const updateNumberOfCities = () => {
        if (selectedCities.length === 1) {
            let city = selectedCities[0];
            setNumberOfCities(city.title);
        } else if (selectedCities.length === 2) {
            let city1 = selectedCities[0];
            let city2 = selectedCities[1];
            setNumberOfCities(city1.title + ', ' + city2.title);
        } else if (selectedCities.length > 2) {
            let city1 = selectedCities[0];
            let city2 = selectedCities[1];
            setNumberOfCities(city1.title + ', ' + city2.title + '...');
        } else
            setNumberOfCities("شهر");
    }

    const submitCities = () => {
        console.log("submitCities" );
        updateNumberOfCities();
        handleStatesClose();
    }


    // Show BusinessTypeModal

    const [businessTypes, setBusinessTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/businesstype/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBusinessTypes(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const [businessTypeModalShow, setBusinessTypeModalShow] = useState(false);

    const handleBusinessTypeModalClose = () => {
        setBusinessTypeModalShow(false);
    }

    const handleBusinessTypeModalShow = () => {
        setBusinessTypeModalShow(true);
    }

    const [selectedBusinessTypes, setSelectedBusinessTypes] = useState([]);
    const [numberOfBusinessTypes, setNumberOfBusinessTypes] = useState("نوع کسب و کار");


    const onBusinessTypeAdded = (id, title) => {
        let businessType = {"id": id, "title": title};

        const found = selectedBusinessTypes.find(obj => {
            return obj.id === id;
        });
        if (!found) {
            selectedBusinessTypes.push(businessType);
            setSelectedBusinessTypes([...selectedBusinessTypes]);
            updateNumberOfBusinessTypes();
        }
    }

    const onBusinessTypeRemoved = (checkedId, title) => {
        let businessType = {"id": checkedId, "title": title};
        let index = selectedCities.indexOf(businessType);
        if (index >= -1) {
            //Removing values from array
            selectedBusinessTypes.splice(index, 1);
        }
        setSelectedBusinessTypes([...selectedBusinessTypes]);
        updateNumberOfBusinessTypes();
    }

    const updateNumberOfBusinessTypes = () => {

        if (selectedBusinessTypes.length === 1) {
            console.log(" Hey 1" );
            let businessType = selectedBusinessTypes[0];
            setNumberOfBusinessTypes(businessType.title);
        } else if (selectedBusinessTypes.length === 2) {
            console.log(" Hey 2" );
            let businessType1 = selectedBusinessTypes[0];
            let businessType2 = selectedBusinessTypes[1];
            setNumberOfBusinessTypes(businessType1.title + ', ' + businessType2.title);
        } else if (selectedBusinessTypes.length > 2) {
            console.log(" Hey 3" );
            let businessType1 = selectedBusinessTypes[0];
            let businessType2 = selectedBusinessTypes[1];
            setNumberOfBusinessTypes(businessType1.title + ', ' + businessType2.title + '...');
        } else
            setNumberOfBusinessTypes("نوع کسب و کار");
    }


    const submitBusinessTypes = () => {
        updateNumberOfBusinessTypes();
        handleBusinessTypeModalClose();
    }


    return (
        <div>
            <Header handleStatesShow={handleStatesShow}
                    statesModalShow={statesModalShow}
                    onHide={handleStatesClose}
                    onStatesClose={handleStatesClose}
                    numberOfCities={numberOfCities}

                    selectedCities={selectedCities}
                    cities={cities}

                    citiesModalShow={citiesModalShow}
                    setNumberOfCities={setNumberOfCities}
                    onStateClick={handleCitiesShow}
                    handleCitiesClose={handleCitiesClose}
                    submitCities={submitCities}
                    onCityAdded={onCityAdded}
                    onCityRemoved={onCityRemoved}

                    businessTypes={businessTypes}
                    selectedBusinessTypes={selectedBusinessTypes }
                    numberOfBusinessTypes={numberOfBusinessTypes}
                    businessTypeModalShow={businessTypeModalShow}
                    handleBusinessTypeModalShow={handleBusinessTypeModalShow}
                    handleBusinessTypeModalClose={handleBusinessTypeModalClose}
                    submitBusinessTypes={submitBusinessTypes}
                    onBusinessTypeAdded={onBusinessTypeAdded}
                    onBusinessTypeRemoved={onBusinessTypeRemoved}
            />
{/*<Carousel/>*/}

            <div className="row flex-nowrap m-0 p-0">
               <MainBody/>
                <RightPane selectedCities={selectedCities}
                           statesModalShow={statesModalShow}
                           onHide={handleStatesClose}
                           onStatesClose={handleStatesClose}
                           onCityRemoved={onCityRemoved}
                           numberOfCities={numberOfCities}
                           onStateClick={handleCitiesShow}

                           businessTypes={businessTypes}
                           selectedBusinessTypes={selectedBusinessTypes }
                           numberOfBusinessTypes={numberOfBusinessTypes}
                           businessTypeModalShow={businessTypeModalShow}
                           handleBusinessTypeModalShow={handleBusinessTypeModalShow}
                           handleBusinessTypeModalClose={handleBusinessTypeModalClose}
                           submitBusinessTypes={submitBusinessTypes}
                           onBusinessTypeAdded={onBusinessTypeAdded}
                           onBusinessTypeRemoved={onBusinessTypeRemoved}
                />
            </div>
            <Footer/>
        </div>);
}

export default App;
