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
                          alt="Hi" title="Fancy Products" lowPrice="400000" highPrice="800000"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"
                          saleStart="1402/02/15" saleEnd="1402/02/20" lowPercent="%10" highPercent="%90"
                          saleLenght="10" daysToEnd="5" daysToStart="0" status="فعال"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="Fancy Products" lowPrice="400000" highPrice="800000"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"
                          saleStart="1402/02/15" saleEnd="1402/02/20" lowPercent="%10" highPercent="%90"
                          saleLenght="10" daysToEnd="5" daysToStart="3" status="به زودی"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="ایران تریکو" lowPrice="400000" highPrice="800000"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"
                          saleStart="1402/02/15" saleEnd="1402/02/20" lowPercent="%10" highPercent="%90"
                          saleLenght="10" daysToEnd="0" daysToStart="0" status="پایان حراجی"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="برق لامع" lowPrice="400000" highPrice="800000"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"
                          saleStart="1402/02/15" saleEnd="1402/02/20" lowPercent="%10" highPercent="%90"
                          saleLenght="10"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="ال سی وایکیکی" lowPrice="400000" highPrice="800000"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"
                          saleStart="1402/02/15" saleEnd="1402/02/20" lowPercent="%10" highPercent="%90"
                          saleLenght="10"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="پاتن جامه" lowPrice="400000" highPrice="800000"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"
                          saleStart="1402/02/15" saleEnd="1402/02/20" lowPercent="%10" highPercent="%90"
                          saleLenght="10"/>
                <SaleCard imageUrl="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                          alt="Hi" title="زارا" lowPrice="400000" highPrice="800000"
                          type="پوشاک زنانه" city="تهران" place="هفت حوض" oldPrice="20.00" newPrice="18.00"
                          saleStart="1402/02/15" saleEnd="1402/02/20" lowPercent="%10" highPercent="%90"
                          saleLenght="10"/>
            </div>
        </div>
    )

}
