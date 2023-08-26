import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RightPane from "./sale/main/rightPane/RightPane";
import MainBody from "./sale/main/mainBody/MainBody";
import React from "react";
import OffCanvasHeader from "./sale/header/OffCanvasHeader";
import Carousel from "./sale/banner/Carousel";

function App() {

    return (
        <div >
            <OffCanvasHeader/>
            <Carousel/>

            <div className="row  flex-nowrap container m-0 p-0">
                <MainBody/>
                <RightPane/>
            </div>
            {/*<Footer/>*/}
        </div>);
}

export default App;
