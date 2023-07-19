import './Product.css'

const Product=({item, onDelete})=>{

    return (<div className="product">
             <div>{item.title}</div>
             <div><button className="btn" title="click"
             onClick={()=>onDelete(item.id)}>Delete</button></div>
            </div>)
}
export default Product;