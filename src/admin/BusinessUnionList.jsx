// src/admin/BusinessUnionList.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
    getBusinessUnions,
    addBusinessUnion,
    updateBusinessUnion,
    deleteBusinessUnion
} from '../api/admin/businessUnionApi';
import { filterEnglishOnly } from '../utils/validators';

export default function BusinessUnionList({ onUnionChange }) {
    const [unions, setUnions] = useState([]);
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');

    // State for edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editName, setEditName] = useState('');
    const [editTitle, setEditTitle] = useState('');

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

    const handleEditClick = (item) => {
        setEditingItem(item);
        setEditName(item.name);
        setEditTitle(item.title);
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editName.trim() || !editTitle.trim()) return;
        await updateBusinessUnion(editingItem.id, editName.trim(), editTitle.trim());
        setShowEditModal(false);
        loadUnions();
        if (onUnionChange) onUnionChange();
    };

    return (
        <div className="admin-section">
            <h3>اتحادیه‌های صنفی</h3>

            {/* فرم افزودن */}
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

            {/* لیست */}
            <ul className="admin-list">
                {unions.map(union => (
                    <li key={union.id}>
                        <span>{union.title} <small>({union.name})</small></span>
                        <div>
                            <button className="edit-btn" onClick={() => handleEditClick(union)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(union.id)}>🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* مودال ویرایش */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} dir="rtl">
                <Modal.Header closeButton>
                    <Modal.Title>ویرایش اتحادیه صنفی</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleEditSubmit}>
                    <Modal.Body>
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
