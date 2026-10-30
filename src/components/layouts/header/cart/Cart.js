function Cart({number}){
    return(
        <div >
            <button type="button" className="btn btn-light btn-rounded text-nowrap" >
                <i className='bi bi-file-text'></i>
                علاقمندی ها
                <span className="badge badge-warning bg-dark text-white ms-1 rounded-pill">{number}</span>
            </button>
        </div>
    )
}
export default Cart;