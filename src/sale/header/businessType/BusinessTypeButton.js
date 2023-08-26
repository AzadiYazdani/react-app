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
        <div className=" row m-0 ms-1 p-0 app-right-to-left">
            <div className="justify-content-end">
                <label className="mx-1 mt-1" htmlFor={props.businessType.id}
                       onChange={onChanged}>{props.businessType.title}</label>
            </div>
            <div className="justify-content-start">
                <input className="mx-1 mt-1 flex-nowrap "
                       type="checkbox"
                       id={props.businessType.id}
                       name={props.businessType.title}
                       defaultChecked={props.value}
                       value={props.businessType.id}
                       onChange={onChanged}
                />
            </div>
            <hr className="hr-divider"/>
        </div>
    );

}
