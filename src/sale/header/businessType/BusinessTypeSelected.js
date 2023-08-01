import React from "react";

export default function BusinessTypeSelected(props) {

    const removeToCollection = event => {
        props.onBusinessTypeRemoved(event.currentTarget.id, event.currentTarget.title);
    };

    return (
        <div className="tag_list" id={props.businessType.id} title= {props.businessType.title} data-id={props.businessType.id} onClick={removeToCollection}>
            {props.businessType.title}
            <span className="close">&times;</span>
        </div>
    );
}

