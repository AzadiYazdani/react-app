import '../location/Location.css';
import React, {ChangeEvent} from "react";

export default function BusinessTypeButton(props) {


    const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            props.onBusinessTypeAdded(event.target.value, event.target.name);
        } else {
            props.onBusinessTypeRemoved(event.target.value, event.target.name);
        }
    }

    return (
        <div className="container m-0 ps-0 app-right-to-left">
            {/*<div className="justify-content-start">*/}
                <label className="row-cols-1 m-0 p-0 " htmlFor={props.businessType.id}
                       onChange={onChanged}>{props.businessType.title}</label>
            {/*</div>*/}
            {/*<div className="justify-content-start">*/}
                <input className="row-cols-1 m-0 p-0"
                       type="checkbox"
                       id={props.businessType.id}
                       name={props.businessType.title}
                       defaultChecked={props.value}
                       value={props.businessType.id}
                       onChange={onChanged}
                />
            {/*</div>*/}
            <hr className="hr-divider"/>
        </div>
    );

}
