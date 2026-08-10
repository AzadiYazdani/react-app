// src/admin/JobCategoryList.jsx
import React, { useState, useEffect } from 'react';
import { getJobCategories, addJobCategory, deleteJobCategory } from '../api/admin/jobCategoryApi';

export default function JobCategoryList({ unions }) {
    const [categories, setCategories] = useState([]);
    const [selectedUnionId, setSelectedUnionId] = useState('');
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const loadCategories = () => {
        getJobCategories().then(data => setCategories(data));
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!selectedUnionId || !newName.trim() || !newTitle.trim()) return;
        await addJobCategory(parseInt(selectedUnionId), newName.trim(), newTitle.trim());
        setNewName('');
        setNewTitle('');
        loadCategories();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('حذف شود؟')) return;
        await deleteJobCategory(id);
        loadCategories();
    };

    return (
        <div className="admin-section">
            <h3>رسته‌های شغلی</h3>
            <form onSubmit={handleAdd} className="admin-form">
                <select
                    value={selectedUnionId}
                    onChange={e => setSelectedUnionId(e.target.value)}
                    required
                >
                    <option value="">انتخاب اتحادیه</option>
                    {unions.map(union => (
                        <option key={union.id} value={union.id}>{union.title}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="نام انگلیسی (مثلاً Clothing)"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="نام فارسی (مثلاً پوشاک)"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                />
                <button type="submit">افزودن</button>
            </form>
            <ul className="admin-list">
                {categories.map(cat => (
                    <li key={cat.id}>
                        <span>{cat.title} <small>({cat.name})</small></span>
                        <span><small>اتحادیه: {cat.business_union_title || cat.business_union_name}</small></span>
                        <button onClick={() => handleDelete(cat.id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
