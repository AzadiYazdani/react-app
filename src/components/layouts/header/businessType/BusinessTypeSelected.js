import React from "react";

export default function BusinessTypeSelected({
    businessType,
    onBusinessTypeRemoved
}) {

    return (
        <div className="business-selected-item">

            <span>
                {businessType.title}
            </span>

            <button
                type="button"
                className="business-selected-remove"
                onClick={() =>
                    onBusinessTypeRemoved(
                        businessType.id,
                        businessType.title
                    )
                }
            >
                <i className="bi bi-x"></i>
            </button>

        </div>
    );
}
