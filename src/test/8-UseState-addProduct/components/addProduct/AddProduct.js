import {useState} from 'react'

const AddProduct=({onAdd})=>{

    const [title, setTitle]=useState('')

    const submitForm=(event) => {
        event.preventDefault();
        onAdd( {title} );
        setTitle('');
    }

    return(<div>
        <form className="ad-product-form" onSubmit={submitForm}>
           <div> <input type="Text" placeholder="Add product"  value={title}
                        onChange={(event)=> setTitle(event.target.value)} />
           </div>
            <input type="submit" value="Add"/>
        </form>
    </div>)
}
export default AddProduct