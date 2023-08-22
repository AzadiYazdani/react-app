import './App.css';
import Footer from "./sale/footer/Footer";
import Banner from "./sale/banner/Banner";
import 'bootstrap/dist/css/bootstrap.min.css';
import RightPane from "./sale/main/rightPane/RightPane";
import MainBody from "./sale/main/mainBody/MainBody";
import React from "react";
import OffCanvasHeader from "./sale/header/OffCanvasHeader";

function App() {

    return (
        <div className="row font-vazir">
            <OffCanvasHeader/>

        <Banner/>

        <div className="row col-12 py-5 container">
            <MainBody/>
            <RightPane/>
        </div>
        <Footer/>
    </div>);
}

export default App;
