import './App.css';
import Footer from "./sale/footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import RightPane from "./sale/main/rightPane/RightPane";
import MainBody from "./sale/main/mainBody/MainBody";
import React from "react";
import OffCanvasHeader from "./sale/header/OffCanvasHeader";
import Carousel from "./sale/banner/Carousel";

function App() {

    return (
        <div className="font-vazir">
            <OffCanvasHeader/>
        <Carousel/>

        <div className="row container">
            <MainBody/>
            <RightPane/>
        </div>
        <Footer/>
    </div>);
}

export default App;
