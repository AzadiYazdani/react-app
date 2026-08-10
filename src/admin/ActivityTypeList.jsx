// src/admin/ActivityTypeList.jsx
import React, { useState, useEffect } from 'react';
import { getActivityTypes, addActivityType, deleteActivityType } from '../api/admin/activityTypeApi';
import { filterEnglishOnly } from '../utils/validators';

export default function ActivityTypeList() {
    const [types, setTypes] = useState([]);
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const loadTypes = () => {
        getActivityTypes().then(data => setTypes(data));
    };

    useEffect(() => {
        loadTypes();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newName.trim() || !newTitle.trim()) return;
        await addActivityType(newName.trim(), newTitle.trim());
        setNewName('');
        setNewTitle('');
        loadTypes();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('حذف شود؟')) return;
        await deleteActivityType(id);
        loadTypes();
    };

    return (
        <div className="admin-section">
            <h3>نوع فعالیت (جواز کسب)</h3>
            <form onSubmit={handleAdd} className="admin-form">
                <input
                    type="text"
                    placeholder="نام انگلیسی (فقط حروف لاتین)"
                    value={newName}
                    onChange={e => setNewName(filterEnglishOnly(e.target.value))}
                    dir="ltr"
                />
                <input
                    type="text"
                    placeholder="نام فارسی"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                />
                <button type="submit">افزودن</button>
            </form>
            <ul className="admin-list">
                {types.map(type => (
                    <li key={type.id}>
                        <span>{type.title} <small>({type.name})</small></span>
                        <button onClick={() => handleDelete(type.id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
