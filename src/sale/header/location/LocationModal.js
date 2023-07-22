import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CountryStateButton from "./CountryStateButton";
import CountryStateWithLineButton from "./CountryStateWithLineButton";
import React, {useState, useEffect} from 'react';
import StateCity from "./StateCity";


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


export default function LocationModal(props) {

    const [data, setData] = useState([]);
    const [states, setStates] = useState([]);
    const [id, setId] = useState('')

    useEffect(() => {
        fetch('http://localhost:8081/location/states/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log('hello data');
                setData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const get_cities = async (id) => {

        try {
            const data = await (await fetch(`http://localhost:8081/location/states/${id}/cities`)).json()
            setData(data)
        } catch (err) {
            console.log(err.message)
        }


        return (<Modal className="app-right-to-left"
                       {...props}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
            <Modal.Header right-to-left>
                <Modal.Title id="contained-modal-title-vcenter">
                    انتخاب شهر
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Array.isArray(data.response) ? data.response.map((item) => {
                    return <StateCity  key={item.id} city={item}/>
                }) : ""}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>انتخاب</Button>
                <Button onClick={props.onHide}>انصراف</Button>
            </Modal.Footer>
        </Modal>);
    }


    return (<Modal className="app-right-to-left"
                   {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
        <Modal.Header right-to-left>
            <Modal.Title id="contained-modal-title-vcenter">
                انتخاب استان
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {Array.isArray(data.response) ? data.response.map((item) => {
                return <CountryStateWithLineButton show_cities={get_cities} key={item.id} state={item}/>
            }) : ""}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>انتخاب</Button>
            <Button onClick={props.onHide}>انصراف</Button>
        </Modal.Footer>
    </Modal>);
}


