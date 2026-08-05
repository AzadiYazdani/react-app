import React, { useState } from "react";

export default function BusinessTypeTree({
    item,
    level = 0,
    selectedBusinessTypes = [],
    onBusinessTypeAdded,
    onBusinessTypeRemoved
}) {

    const [open, setOpen] = useState(false);

    const checked = selectedBusinessTypes.some(
        x => x.id === item.id
    );

    const hasChild =
        Array.isArray(item.children) &&
        item.children.length > 0;


    const handleCheckboxChange = (e) => {

        if (e.target.checked) {

            onBusinessTypeAdded(
                item.id,
                item.title
            );

        } else {

            onBusinessTypeRemoved(
                item.id
            );

        }
    };


    const handleRowClick = () => {

        if (hasChild) {
            setOpen(prev => !prev);
        }

    };


    return (
        <div
            style={{
                paddingRight: level * 20
            }}
        >

            <div
                className="business-type-row"
                onClick={handleRowClick}
            >

                {
                    hasChild &&
                    <span
                        className={
                            `business-arrow ${open ? "open" : ""}`
                        }
                    >
                    </span>
                }


                <input
                    type="checkbox"
                    checked={checked}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleCheckboxChange}
                />


                <span className="business-title">
                    {item.title}
                </span>

            </div>


            {
                open &&
                item.children.map(child => (

                    <BusinessTypeTree
                        key={child.id}
                        item={child}
                        level={level + 1}
                        selectedBusinessTypes={selectedBusinessTypes}
                        onBusinessTypeAdded={onBusinessTypeAdded}
                        onBusinessTypeRemoved={onBusinessTypeRemoved}
                    />

                ))
            }

        </div>
    );
}
