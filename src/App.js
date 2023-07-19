import './App.css';
import Header from "./sale/header/Header";
import Footer from "./sale/footer/Footer";
import Banner from "./sale/banner/Banner";
import 'bootstrap/dist/css/bootstrap.min.css';
import OffCard from "./sale/offCards/OffCard";

function App() {
    return (
        <div className="fff">
            <Header/>
            <Banner/>
            <div className="rtl">
                <section className="py-5">
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            <OffCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                                     alt="Hi" title="Fancy Productss" lowPrice="40.00" highPrice="80.00"
                                     type="پوشاک زنانه"
                                     city="تهران" place="هفت حوض"
                                     oldPrice="20.00" newPrice="18.00"/>
                            <OffCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                                     alt="Hi" title="Fancy Productss" lowPrice="40.00" highPrice="80.00"
                                     type="پوشاک مردانه"
                                     city="تهران" place="میدان ونک" oldPrice="20.00" newPrice="18.00"/>
                            <OffCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                                     alt="Hi" title="Fancy Productss" lowPrice="40.00" highPrice="80.00" type="رستوران"
                                     city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"/>
                            <OffCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                                     alt="Hi" title="Fancy Productss" lowPrice="40.00" highPrice="80.00"
                                     type="test tstests"
                                     oldPrice="20.00" newPrice="18.00"/>
                            <OffCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                                     alt="Hi" title="Fancy Productss" lowPrice="40.00" highPrice="80.00"
                                     type="test tstests"
                                     oldPrice="20.00" newPrice="18.00"/>
                            <OffCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                                     alt="Hi" title="Fancy Productss" lowPrice="40.00" highPrice="80.00"
                                     type="test tstests"
                                     oldPrice="20.00" newPrice="18.00"/>
                            <OffCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                                     alt="Hi" title="Fancy Productss" lowPrice="40.00" highPrice="80.00"
                                     type="test tstests"
                                     oldPrice="20.00" newPrice="18.00"/>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
