import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StateButton from "./StateButton";
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';


// const states = [
//     {id: 1, title: 'آذربایجان شرقی'},
//     {id: 2, title: 'آذربایجان غربی'},
//     {id: 3, title: 'اردبیل'},
//     {id: 4, title: 'اصفهان'},
//     {id: 5, title: 'البرز'},
//     {id: 6, title: 'ایلام'},
//     {id: 7, title: 'بوشهر'},
//     {id: 8, title: 'تهران'},
//     {id: 9, title: 'چهارمحال و بختیاری'},
//     {id: 10, title: 'خراسان جنوبی'},
//     {id: 11, title: 'خراسان رضوی'},
//     {id: 12, title: 'خراسان شمالی'},
//     {id: 13, title: 'خوزستان'},
//     {id: 14, title: 'زنجان'},
//     {id: 15, title: 'سمنان'},
//     {id: 16, title: 'سیستان و بلوچستان'},
//     {id: 17, title: 'فارس'},
//     {id: 18, title: 'قزوین'},
//     {id: 19, title: 'قم'},
//     {id: 20, title: 'کردستان'},
//     {id: 21, title: 'کرمان'},
//     {id: 22, title: 'کرمانشاه'},
//     {id: 23, title: 'کهگیلویه و بویراحمد'},
//     {id: 24, title: 'گلستان'},
//     {id: 25, title: 'گیلان'},
//     {id: 26, title: 'لرستان'},
//     {id: 27, title: 'مازندران'},
//     {id: 28, title: 'مرکزی'},
//     {id: 29, title: 'هرمزگان'},
//     {id: 30, title: 'همدان'},
// ]


export default function StateModal(props) {

    const [states, setStates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/location/states/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setStates(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const get_cities = async (id) => {
        props.onStateClick(id);
    }

    return (

        <Modal className="app-right-to-left  align-items-center"
                   {...props}
               size="modal-sm"
               aria-labelledby="contained-modal-title-vcenter"
               centered>
        <Modal.Header>
            <Modal.Title >
                انتخاب استان
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                {Array.isArray(props.selectedCities) ? props.selectedCities.map((item) => {
                    return <div className="tag_list" id={item.id} data-id={item.id}>{item.title}<span>&times;</span>
                    </div>
                }) : ""}
            </div>
                {Array.isArray(states.response) ? states.response.map((item) => {
                    return <StateButton show_cities={get_cities} key={item.id} state={item}/>
                }) : ""}
         </Modal.Body>
         <Modal.Footer >
             <Button onClick={props.onHide}>بستن</Button>
         </Modal.Footer>
     </Modal>
);
}


