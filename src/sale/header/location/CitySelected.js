import React from "react";

export default function CitySelected(props) {

    const removeToCollection = event => {
        props.onCityRemoved(event.currentTarget.id, event.currentTarget.title);
    };

    return (
        <div className="tag_list" id={props.city.id} title= {props.city.title} data-id={props.city.id} onClick={removeToCollection}>
            {props.city.title}
            <span className="close">&times;</span>
        </div>
    );
}

