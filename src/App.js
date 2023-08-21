import './App.css';
import Header from "./sale/header/Header";
import Footer from "./sale/footer/Footer";
import Banner from "./sale/banner/Banner";
import 'bootstrap/dist/css/bootstrap.min.css';
import RightPane from "./sale/main/rightPane/RightPane";
import MainBody from "./sale/main/mainBody/MainBody";
import React from "react";

function App() {

    return (<div className=" row rtl">
        <Header/>
        <Banner/>

        <div className="row col-12 py-5 container">
            <MainBody/>
            <RightPane/>
        </div>
        <Footer/>
    </div>);
}

export default App;
