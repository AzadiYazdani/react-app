
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import userService from "../../services/UserService";
import "./UsersPage.css";

const EMPTY_FORM = {
    email: "",
    mobile: "",
    address: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    nationalCode: "",
    identityNumber: "",
    birthDate: "",
    birthCity: ""
};

const EMPTY_ACCESS_FORM = {
    role: "VIEWER",
    enabled: false,
    locked: false
};

const EDIT_FIELDS = [
    { name: "firstName", label: "نام" },
    { name: "lastName", label: "نام خانوادگی" },
    { name: "fatherName", label: "نام پدر" },
    { name: "nationalCode", label: "کد ملی" },
    { name: "identityNumber", label: "شماره شناسنامه" },
    { name: "birthDate", label: "تاریخ تولد" },
    { name: "birthCity", label: "محل تولد" },
    { name: "email", label: "ایمیل", type: "email" },
    { name: "mobile", label: "شماره موبایل" },
    { name: "address", label: "نشانی", type: "textarea" }
];

const DETAIL_FIELDS = [
    { name: "firstName", label: "نام" },
    { name: "lastName", label: "نام خانوادگی" },
    { name: "fatherName", label: "نام پدر" },
    { name: "nationalCode", label: "کد ملی" },
    { name: "identityNumber", label: "شماره شناسنامه" },
    { name: "birthDate", label: "تاریخ تولد" },
    { name: "birthCity", label: "محل تولد" },
    { name: "issueCity", label: "محل صدور شناسنامه" },
    { name: "email", label: "ایمیل" },
    { name: "mobile", label: "شماره موبایل" },
    { name: "cityCode", label: "کد شهر" },
    { name: "telephone", label: "تلفن ثابت" },
    { name: "address", label: "نشانی" }
];

const ROLE_OPTIONS = [
    { value: "ADMIN", label: "مدیر سیستم" },
    { value: "REGISTER", label: "کارمند ثبت مشتریان" },
    { value: "SELLER", label: "فروشنده" },
    { value: "VIEWER", label: "کاربر عادی" }
];

const getPerson = (user) => user?.person ?? {};

const getFullName = (user) => {
    const person = getPerson(user);
    return [person.firstName, person.lastName].filter(Boolean).join(" ") || "—";
};

const getUserStatus = (user) => {
    if (user?.locked) return "مسدود";
    return user?.enabled ? "فعال" : "غیرفعال";
};

const getRoleLabel = (role) => {
    const roles = {
        ADMIN: "مدیر سیستم",
        REGISTER: "کارمند ثبت مشتریان",
        SELLER: "فروشنده",
        VIEWER: "کاربر عادی"
    };

    return roles[role] ?? role ?? "—";
};

const createEditForm = (user) => {
    const person = getPerson(user);

    return Object.keys(EMPTY_FORM).reduce((form, key) => {
        form[key] = person[key] ?? "";
        return form;
    }, {});
};

const createAccessForm = (user) => ({
    role: user?.role ?? "VIEWER",
    enabled: Boolean(user?.enabled),
    locked: Boolean(user?.locked)
});

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sortField, setSortField] = useState("id");
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalMode, setModalMode] = useState("view");
    const [editForm, setEditForm] = useState(EMPTY_FORM);
    const [accessForm, setAccessForm] = useState(EMPTY_ACCESS_FORM);
    const [accessEditing, setAccessEditing] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [accessSaving, setAccessSaving] = useState(false);
    const [modalError, setModalError] = useState("");

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const params = {
                page,
                size: pageSize,
                sort: `${sortField},${sortField === "id" ? "desc" : "asc"}`
            };

            const response = activeSearch
                ? await userService.searchUsers(activeSearch, params)
                : await userService.getAllUsers(params);

            setUsers(response?.content ?? []);
            setTotalPages(response?.totalPages ?? 0);
            setTotalElements(response?.totalElements ?? 0);
        } catch (err) {
            setError(err?.response?.data?.message || "دریافت فهرست کاربران ناموفق بود.");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, activeSearch, sortField]);


    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = (event) => {
        event.preventDefault();
        setPage(0);
        setActiveSearch(searchText.trim());
    };

    const handleClearSearch = () => {
        setSearchText("");
        setActiveSearch("");
        setPage(0);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPage(0);
    };

    const handleShowDetails = async (userId) => {
        setShowModal(true);
        setModalMode("view");
        setSelectedUser(null);
        setEditForm(EMPTY_FORM);
        setAccessForm(EMPTY_ACCESS_FORM);
        setAccessEditing(false);
        setModalError("");
        setDetailsLoading(true);

        try {
            const user = await userService.getUserById(userId);
            setSelectedUser(user);
            setEditForm(createEditForm(user));
            setAccessForm(createAccessForm(user));
        } catch (err) {
            setModalError(err?.response?.data?.message || "دریافت اطلاعات کاربر ناموفق بود.");
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleStartEditing = () => {
        setEditForm(createEditForm(selectedUser));
        setModalError("");
        setModalMode("edit");
    };

    const handleCancelEditing = () => {
        setEditForm(createEditForm(selectedUser));
        setModalError("");
        setModalMode("view");
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setEditForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSave = async (event) => {
        event.preventDefault();

        if (!selectedUser?.id) {
            setModalError("شناسه کاربر برای ویرایش در دسترس نیست.");
            return;
        }

        setSaving(true);
        setModalError("");

        try {
            await userService.editUserByAdmin(selectedUser.id, editForm);

            const updatedUser = await userService.getUserById(selectedUser.id);

            setSelectedUser(updatedUser);
            setEditForm(createEditForm(updatedUser));
            setAccessForm(createAccessForm(updatedUser));
            setModalMode("view");

            await fetchUsers();
        } catch (err) {
            setModalError(err?.response?.data?.message || "ذخیره تغییرات ناموفق بود.");
        } finally {
            setSaving(false);
        }
    };

    const handleStartAccessEditing = () => {
        setAccessForm(createAccessForm(selectedUser));
        setModalError("");
        setAccessEditing(true);
    };

    const handleCancelAccessEditing = () => {
        setAccessForm(createAccessForm(selectedUser));
        setModalError("");
        setAccessEditing(false);
    };

    const handleAccessFormChange = (event) => {
        const { name, value, checked, type } = event.target;

        setAccessForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSaveAccess = async () => {
        if (!selectedUser?.id) {
            setModalError("شناسه کاربر برای تغییر دسترسی در دسترس نیست.");
            return;
        }

        setAccessSaving(true);
        setModalError("");

        try {
            await userService.updateUserAccess(selectedUser.id, accessForm);

            const updatedUser = await userService.getUserById(selectedUser.id);

            setSelectedUser(updatedUser);
            setAccessForm(createAccessForm(updatedUser));
            setAccessEditing(false);

            await fetchUsers();
        } catch (err) {
            setModalError(err?.response?.data?.message || "تغییر دسترسی کاربر ناموفق بود.");
        } finally {
            setAccessSaving(false);
        }
    };

    const handleCloseModal = () => {
        if (saving || accessSaving) return;

        setShowModal(false);
        setSelectedUser(null);
        setModalMode("view");
        setAccessEditing(false);
        setModalError("");
    };

    const renderDetailValue = (value) => {
        if (value === null || value === undefined || value === "") return "—";
        return value;
    };

    return (
        <div className="users-page" dir="rtl">
            <div className="users-page-header">
                <h3>مدیریت کاربران</h3>
                <span>تعداد کل کاربران: {totalElements}</span>
            </div>



<div className="users-toolbar">
    <Form onSubmit={handleSearch} className="users-search-form">
        <Form.Control
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="نام، نام خانوادگی، کد ملی یا شناسه ورود"
        />

        <Button type="submit" variant="primary">
            جستجو
        </Button>

        {(activeSearch || searchText) && (
            <Button
                type="button"
                variant="outline-secondary"
                onClick={handleClearSearch}
            >
                پاک کردن
            </Button>
        )}
    </Form>

    <div className="users-table-settings">
        <div className="users-sort-control">
            <Form.Label htmlFor="users-sort-select">
                مرتب‌سازی:
            </Form.Label>

            <Form.Select
                id="users-sort-select"
                size="sm"
                value={sortField}
                onChange={(event) => {
                    setSortField(event.target.value);
                    setPage(0);
                }}
            >
                <option value="id">جدیدترین کاربران</option>
                <option value="person.firstName">نام</option>
                <option value="person.lastName">نام خانوادگی</option>
                <option value="primaryIdentifierValue">شناسه ورود</option>
            </Form.Select>
        </div>

        <div className="users-page-size">
            <Form.Label htmlFor="users-page-size-select">
                تعداد در هر صفحه:
            </Form.Label>

            <Form.Select
                id="users-page-size-select"
                size="sm"
                value={pageSize}
                onChange={handlePageSizeChange}
            >
                <option value={10}>۱۰</option>
                <option value={20}>۲۰</option>
                <option value={50}>۵۰</option>
                <option value={100}>۱۰۰</option>
            </Form.Select>
        </div>
    </div>
</div>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="users-table-wrapper">
                <Table responsive bordered hover className="users-table">
                    <thead>
                        <tr>
                            <th>نام و نام خانوادگی</th>
                            <th>شناسه ورود</th>
                            <th>نقش</th>
                            <th>وضعیت</th>
                            <th>تاریخ ایجاد</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="users-table-message">
                                    <Spinner animation="border" size="sm" />
                                    <span>در حال دریافت اطلاعات...</span>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="users-table-message">
                                    کاربری یافت نشد.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className={
                                        user.locked
                                            ? "user-row-locked"
                                            : !user.enabled
                                                ? "user-row-disabled"
                                                : ""
                                    }
                                >
                                    <td>{getFullName(user)}</td>
                                    <td>{user.identifier || "—"}</td>
                                    <td>{getRoleLabel(user.role)}</td>
                                    <td>{getUserStatus(user)}</td>
                                    <td>{user.createdDate || "—"}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="outline-primary"
                                            onClick={() => handleShowDetails(user.id)}
                                        >
                                            جزئیات
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            <div className="users-pagination">
                <Button
                    variant="outline-secondary"
                    size="sm"
                    disabled={page <= 0 || loading}
                    onClick={() => setPage((current) => current - 1)}
                >
                    قبلی
                </Button>

                <span>
                    صفحه {totalPages === 0 ? 0 : page + 1} از {totalPages}
                </span>

                <Button
                    variant="outline-secondary"
                    size="sm"
                    disabled={page + 1 >= totalPages || loading}
                    onClick={() => setPage((current) => current + 1)}
                >
                    بعدی
                </Button>
            </div>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                size="lg"
                dialogClassName="user-details-modal"
                backdrop={saving || accessSaving ? "static" : true}
                keyboard={!saving && !accessSaving}
            >
                <Modal.Header closeButton={!saving && !accessSaving}>
                    <Modal.Title>
                        {modalMode === "edit" ? "ویرایش اطلاعات کاربر" : "جزئیات کاربر"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {detailsLoading ? (
                        <div className="users-modal-loading">
                            <Spinner animation="border" />
                            <span>در حال دریافت اطلاعات کاربر...</span>
                        </div>
                    ) : modalError && !selectedUser ? (
                        <Alert variant="danger">{modalError}</Alert>
                    ) : selectedUser ? (
                        <>
                            {modalError && <Alert variant="danger">{modalError}</Alert>}

                            {modalMode === "view" ? (
                                <>
                                    <div className="user-account-details">
                                        <div>
                                            <span>شناسه ورود</span>
                                            <strong>{renderDetailValue(selectedUser.identifier)}</strong>
                                        </div>

                                        <div>
                                            <span>نقش</span>
                                            <strong>{getRoleLabel(selectedUser.role)}</strong>
                                        </div>

                                        <div>
                                            <span>وضعیت</span>
                                            <strong>{getUserStatus(selectedUser)}</strong>
                                        </div>

                                        <div>
                                            <span>تاریخ ایجاد</span>
                                            <strong>{renderDetailValue(selectedUser.createdDate)}</strong>
                                        </div>
                                    </div>

                                    <div className="user-section-header">
                                        <h6 className="user-section-title">اطلاعات شخصی</h6>

                                        <Button
                                            size="sm"
                                            variant="outline-primary"
                                            onClick={handleStartEditing}
                                            disabled={accessSaving}
                                        >
                                            ویرایش اطلاعات
                                        </Button>
                                    </div>

                                    <div className="user-details-grid">
                                        {DETAIL_FIELDS.map((field) => (
                                            <div className="user-detail-item" key={field.name}>
                                                <span>{field.label}</span>
                                                <strong>
                                                    {renderDetailValue(getPerson(selectedUser)[field.name])}
                                                </strong>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="user-access-section">
                                        <div className="user-section-header">
                                            <h6 className="user-section-title">مدیریت دسترسی حساب</h6>

                                            {!accessEditing && (
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={handleStartAccessEditing}
                                                    disabled={accessSaving}
                                                >
                                                    ویرایش دسترسی
                                                </Button>
                                            )}
                                        </div>

                                        {accessEditing ? (
                                            <div className="user-access-edit-grid">
                                                <Form.Group>
                                                    <Form.Label>نقش کاربر</Form.Label>

                                                    <Form.Select
                                                        name="role"
                                                        value={accessForm.role}
                                                        onChange={handleAccessFormChange}
                                                    >
                                                        {ROLE_OPTIONS.map((role) => (
                                                            <option key={role.value} value={role.value}>
                                                                {role.label}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>

                                                <div className="user-access-checks">
                                                    <Form.Check
                                                        type="switch"
                                                        id="user-enabled"
                                                        name="enabled"
                                                        label="حساب کاربر فعال باشد"
                                                        checked={accessForm.enabled}
                                                        onChange={handleAccessFormChange}
                                                    />

                                                    <Form.Check
                                                        type="switch"
                                                        id="user-locked"
                                                        name="locked"
                                                        label="حساب کاربر مسدود باشد"
                                                        checked={accessForm.locked}
                                                        onChange={handleAccessFormChange}
                                                    />
                                                </div>

                                                <div className="user-access-actions">
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={handleCancelAccessEditing}
                                                        disabled={accessSaving}
                                                    >
                                                        انصراف
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="primary"
                                                        onClick={handleSaveAccess}
                                                        disabled={accessSaving}
                                                    >
                                                        {accessSaving ? (
                                                            <>
                                                                <Spinner animation="border" size="sm" />
                                                                <span className="ms-2">در حال ذخیره...</span>
                                                            </>
                                                        ) : (
                                                            "ذخیره دسترسی"
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="user-access-summary">
                                                <div>
                                                    <span>نقش</span>
                                                    <strong>{getRoleLabel(selectedUser.role)}</strong>
                                                </div>

                                                <div>
                                                    <span>وضعیت حساب</span>
                                                    <strong>{selectedUser.enabled ? "فعال" : "غیرفعال"}</strong>
                                                </div>

                                                <div>
                                                    <span>وضعیت مسدودی</span>
                                                    <strong>{selectedUser.locked ? "مسدود" : "مسدود نیست"}</strong>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <Form id="user-edit-form" onSubmit={handleSave}>
                                    <div className="user-edit-grid">
                                        {EDIT_FIELDS.map((field) => (
                                            <Form.Group
                                                className={field.type === "textarea" ? "user-edit-full" : ""}
                                                key={field.name}
                                            >
                                                <Form.Label>{field.label}</Form.Label>

                                                {field.type === "textarea" ? (
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name={field.name}
                                                        value={editForm[field.name]}
                                                        onChange={handleFormChange}
                                                    />
                                                ) : (
                                                    <Form.Control
                                                        type={field.type || "text"}
                                                        name={field.name}
                                                        value={editForm[field.name]}
                                                        onChange={handleFormChange}
                                                    />
                                                )}
                                            </Form.Group>
                                        ))}
                                    </div>
                                </Form>
                            )}
                        </>
                    ) : null}
                </Modal.Body>

                <Modal.Footer>
                    {selectedUser && !detailsLoading && modalMode === "view" && (
                        <Button
                            variant="secondary"
                            onClick={handleCloseModal}
                            disabled={accessSaving}
                        >
                            بستن
                        </Button>
                    )}

                    {selectedUser && !detailsLoading && modalMode === "edit" && (
                        <>
                            <Button
                                variant="secondary"
                                onClick={handleCancelEditing}
                                disabled={saving}
                            >
                                انصراف
                            </Button>

                            <Button
                                variant="primary"
                                type="submit"
                                form="user-edit-form"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <Spinner animation="border" size="sm" />
                                        <span className="ms-2">در حال ذخیره...</span>
                                    </>
                                ) : (
                                    "ذخیره تغییرات"
                                )}
                            </Button>
                        </>
                    )}

                    {!selectedUser && !detailsLoading && (
                        <Button variant="secondary" onClick={handleCloseModal}>
                            بستن
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UsersPage;
