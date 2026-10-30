// src/admin/BusinessCategoryList.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
    getBusinessCategories,
    addBusinessCategory,
    updateBusinessCategory,
    deleteBusinessCategory
} from '../api/admin/BusinessCategoryApi';
import { filterEnglishOnly } from '../utils/validators';

export default function BusinessCategoryList({ unions }) {
    const [categories, setCategories] = useState([]);
    const [selectedUnionId, setSelectedUnionId] = useState('');
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editUnionId, setEditUnionId] = useState('');
    const [editName, setEditName] = useState('');
    const [editTitle, setEditTitle] = useState('');

    const loadCategories = () => {
        getBusinessCategories().then(data => setCategories(data));
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!selectedUnionId || !newName.trim() || !newTitle.trim()) return;
        await addBusinessCategory(parseInt(selectedUnionId), newName.trim(), newTitle.trim());
        setNewName('');
        setNewTitle('');
        setSelectedUnionId('');
        loadCategories();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('حذف شود؟')) return;
        await deleteBusinessCategory(id);
        loadCategories();
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setEditUnionId(item.business_union_id);
        setEditName(item.name);
        setEditTitle(item.title);
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editUnionId || !editName.trim() || !editTitle.trim()) return;
        await updateBusinessCategory(editingItem.id, parseInt(editUnionId), editName.trim(), editTitle.trim());
        setShowEditModal(false);
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
                {categories.map(cat => (
                    <li key={cat.id}>
                        <span>
                            {cat.title} <small>({cat.name})</small>
                            <span className="union-label">اتحادیه: {cat.business_union_title || cat.business_union_name}</span>
                        </span>
                        <div>
                            <button className="edit-btn" onClick={() => handleEditClick(cat)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(cat.id)}>🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* مودال ویرایش */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} dir="rtl">
                <Modal.Header closeButton>
                    <Modal.Title>ویرایش رسته صنفی</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <label>رسته صنفی</label>
                            <select
                                className="form-control"
                                value={editUnionId}
                                onChange={e => setEditUnionId(e.target.value)}
                                required
                            >
                                <option value="">انتخاب اتحادیه</option>
                                {unions.map(union => (
                                    <option key={union.id} value={union.id}>{union.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>نام انگلیسی</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editName}
                                onChange={e => setEditName(filterEnglishOnly(e.target.value))}
                                dir="ltr"
                            />
                        </div>
                        <div className="form-group">
                            <label>نام فارسی</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>انصراف</Button>
                        <Button variant="primary" type="submit">ذخیره تغییرات</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
