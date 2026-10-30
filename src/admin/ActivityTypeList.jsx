// src/admin/ActivityTypeList.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
    getActivityTypes,
    addActivityType,
    updateActivityType,
    deleteActivityType
} from '../api/admin/activityTypeApi';
import { filterEnglishOnly } from '../utils/validators';

export default function ActivityTypeList() {
    const [types, setTypes] = useState([]);
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editName, setEditName] = useState('');
    const [editTitle, setEditTitle] = useState('');

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

    const handleEditClick = (item) => {
        setEditingItem(item);
        setEditName(item.name);
        setEditTitle(item.title);
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editName.trim() || !editTitle.trim()) return;
        await updateActivityType(editingItem.id, editName.trim(), editTitle.trim());
        setShowEditModal(false);
        loadTypes();
    };

    return (
        <div className="admin-section">
            <h3>نوع فعالیت کسب و کار</h3>

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
                        <div>
                            <button className="edit-btn" onClick={() => handleEditClick(type)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(type.id)}>🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* مودال ویرایش */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} dir="rtl">
                <Modal.Header closeButton>
                    <Modal.Title>ویرایش نوع فعالیت کسب و کار</Modal.Title>
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
