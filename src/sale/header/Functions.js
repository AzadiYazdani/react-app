// import {useState} from "react";
//
//
// // Show State modal
//
// const [statesModalShow, setStatesModalShow] = useState(false);
//
// export function  handleStatesClose(){
//     setStatesModalShow(false);
// }
//
// export function handleStatesShow(){
//     setStatesModalShow(true);
// }
//
//
// // Show LocationButton modal
//
// const [citiesModalShow, setCitiesModalShow] = useState(false);
//
// const [cities, setCities] = useState([]);
//
// const handleCitiesClose = () => {
//     setStatesModalShow(true);
//     setCitiesModalShow(false);
// }
//
// const handleCitiesShow = async (id) => {
//     try {
//         const data = await (await fetch(`http://localhost:8081/location/states/${id}/cities`)).json();
//         setCities(data);
//     } catch (err) {
//         console.log(err.message);
//     }
//     setStatesModalShow(false);
//     setCitiesModalShow(true);
// }
//
//
// // Select Cities
//
// const [selectedCities, setSelectedCities] = useState([]);
// const [numberOfCities, setNumberOfCities] = useState("شهر");
//
// export function onCityAdded(id, title) {
//     let city = {"id": id, "title": title};
//
//     const found = selectedCities.find(obj => {
//         return obj.id === id;
//     });
//     if (!found) {
//         setSelectedCities([...selectedCities, city]);
//     }
//     updateNumberOfCities();
// }
//
// export function onCityRemoved(checkedId, title){
//     let city = {"id": checkedId, "title": title};
//
//     let index = selectedCities.indexOf(city);
//     if (index >= -1) {
//         //Removing values from array
//         selectedCities.splice(index, 1);
//     }
//     setSelectedCities([...selectedCities]);
//     updateNumberOfCities();
// }
//
// export function updateNumberOfCities(){
//     if (selectedCities.length === 1) {
//         let city = selectedCities[0];
//         setNumberOfCities(city.title);
//     } else if (selectedCities.length === 2) {
//         let city1 = selectedCities[0];
//         let city2 = selectedCities[1];
//         setNumberOfCities(city1.title + ', ' + city2.title);
//     } else if (selectedCities.length > 2) {
//         let city1 = selectedCities[0];
//         let city2 = selectedCities[1];
//         setNumberOfCities(city1.title + ', ' + city2.title + '...');
//     } else
//         setNumberOfCities("شهر");
// }
//
// export function submitCities() {
//     updateNumberOfCities();
//     handleStatesClose();
// }
//
//
// // Show BusinessTypeModal
//
//
// export function handleBusinessTypeModalClose() {
//     setBusinessTypeModalShow(false);
// }
//
// export function handleBusinessTypeModalShow() {
//     setBusinessTypeModalShow(true);
// }
//
//
// export function onBusinessTypeAdded(id, title) {
//     let businessType = {"id": id, "title": title};
//
//     const found = selectedBusinessTypes.find(obj => {
//         return obj.id === id;
//     });
//     if (!found) {
//         setSelectedBusinessTypes([...selectedBusinessTypes, businessType]);
//     }
//     updateNumberOfBusinessTypes();
// }
//
// export function onBusinessTypeRemoved(checkedId, title) {
//     let businessType = {"id": checkedId, "title": title};
//     let index = selectedCities.indexOf(businessType);
//     if (index >= -1) {
//         //Removing values from array
//         selectedBusinessTypes.splice(index, 1);
//     }
//     setSelectedBusinessTypes([...selectedBusinessTypes]);
//     updateNumberOfBusinessTypes();
// }
//
// export function updateNumberOfBusinessTypes() {
//     if (selectedBusinessTypes.length === 1) {
//         let city = selectedBusinessTypes[0];
//         setNumberOfBusinessTypes(city.title);
//     } else if (selectedBusinessTypes.length === 2) {
//         let businessType1 = selectedBusinessTypes[0];
//         let businessType2 = selectedBusinessTypes[1];
//         setNumberOfBusinessTypes(businessType1.title + ', ' + businessType2.title);
//     } else if (selectedBusinessTypes.length > 2) {
//         let businessType1 = selectedBusinessTypes[0];
//         let businessType2 = selectedBusinessTypes[1];
//         setNumberOfBusinessTypes(businessType1.title + ', ' + businessType2.title + '...');
//     } else
//         setNumberOfBusinessTypes("نوع کسب و کار");
// }
//
//
// export function submitBusinessTypes() {
//     updateNumberOfBusinessTypes();
//     handleBusinessTypeModalClose();
// }
//
//
