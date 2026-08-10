import React, { useState } from "react";   // <-- حتماً این خط را داشته باشید

export default function BusinessTypeTree({
    item,
    level = 0,
    selectedBusinessTypes = [],
    onBusinessTypeAdded,
    onBusinessTypeRemoved,
    isSearching = false
}) {

    const [open, setOpen] = useState(false);

    const checked = selectedBusinessTypes.some(x => x.id === item.id);
    const hasChild = Array.isArray(item.children) && item.children.length > 0;

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            onBusinessTypeAdded(item.id, item.title);
        } else {
            onBusinessTypeRemoved(item.id);
        }
    };

    const handleRowClick = () => {
        if (!isSearching && hasChild) {
            setOpen(prev => !prev);
        }
    };

    const showChildren = hasChild && (open || isSearching);

    return (
        <div style={{ paddingRight: level * 20 }}>
            <div className="business-type-row" onClick={handleRowClick}>
                {hasChild && (
                    <span className={`business-arrow ${open ? "open" : ""}`} />
                )}
                <input
                    type="checkbox"
                    checked={checked}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleCheckboxChange}
                />
                <span className="business-title">{item.title}</span>
            </div>

            {showChildren && item.children.map(child => (
                <BusinessTypeTree
                    key={child.id}
                    item={child}
                    level={level + 1}
                    selectedBusinessTypes={selectedBusinessTypes}
                    onBusinessTypeAdded={onBusinessTypeAdded}
                    onBusinessTypeRemoved={onBusinessTypeRemoved}
                    isSearching={isSearching}
                />
            ))}
        </div>
    );
}
