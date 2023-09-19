import SaleCard from "../saleCard/SaleCard";
import SortOrder from "./SortOrder";
import React from "react";


export default function MainBody() {
    return (
        <div className="col">
            {/*<div>*/}
            <SortOrder/>
            {/*</div>*/}
            <div className="row  m-0 p-0 col-12 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="Fancy Products" lowPrice="40.00" highPrice="80.00"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="Fancy Products" lowPrice="40.00" highPrice="80.00"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="Fancy Products" lowPrice="40.00" highPrice="80.00"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="Fancy Products" lowPrice="40.00" highPrice="80.00"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="Fancy Products" lowPrice="40.00" highPrice="80.00"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="Fancy Products" lowPrice="40.00" highPrice="80.00"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="Fancy Products" lowPrice="40.00" highPrice="80.00"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"/>
            </div>
        </div>
    )

}