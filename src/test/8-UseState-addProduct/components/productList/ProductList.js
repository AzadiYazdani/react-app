import Product from "../product/Product";

const ProductList = ({products, onDelete}) => {
    return(<div className="product-list">{products.map((item)=>{
        return(<Product
                        key={item.id}
                        item={item}
                       onDelete={onDelete}/>)
    })}</div>)
}
export default ProductList;