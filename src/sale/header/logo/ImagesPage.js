// import logo from '../../../resource/logo.svg'
import logo from '../../../resource/1.jpg';
import  useNavigate  from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ImagesPage() {

    // let navigate = useNavigate();
    const routeChange = () =>{
    //     let path = `newPath`;
    //     navigate(path);
    }

    return (
        <div>
            <Button color="primary" className="px-4" onClick={routeChange}>
                Login
            </Button>
            {/*    <img src={logo} alt="حراجی" onClick={routeChange} ></img>*/}
            {/*</a>*/}
        </div>
    );
}
