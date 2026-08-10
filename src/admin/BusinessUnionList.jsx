// src/admin/BusinessUnionList.jsx
import React, { useState, useEffect } from 'react';
import { getBusinessUnions, addBusinessUnion, deleteBusinessUnion } from '../api/admin/businessUnionApi';
import { filterEnglishOnly } from '../utils/validators'; // اگر تابع کمکی ساختهاید

export default function BusinessUnionList({ onUnionChange }) {
    const [unions, setUnions] = useState([]);
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const loadUnions = () => {
        getBusinessUnions().then(data => setUnions(data));
    };

    useEffect(() => {
        loadUnions();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newName.trim() || !newTitle.trim()) return;
        await addBusinessUnion(newName.trim(), newTitle.trim());
        setNewName('');
        setNewTitle('');
        loadUnions();
        if (onUnionChange) onUnionChange();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('حذف شود؟')) return;
        await deleteBusinessUnion(id);
        loadUnions();
        if (onUnionChange) onUnionChange();
    };

    return (
        <div className="admin-section">
            <h3>اتحادیه‌های صنفی</h3>
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
                {unions.map(union => (
                    <li key={union.id}>
                        <span>{union.title} <small>({union.name})</small></span>
                        <button onClick={() => handleDelete(union.id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
