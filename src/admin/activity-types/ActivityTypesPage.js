import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Button,
    Form,
    Modal,
    Spinner,
    Table
} from "react-bootstrap";

import {
    getActivityTypesByPaging,
    getActivityTypeById,
    searchActivityTypes,
    addActivityType,
    updateActivityType,
    deleteActivityType
} from "../../api/admin/ActivityTypeApi";

import "./ActivityTypesPage.css";

const ActivityTypesPage = () => {

    const [activityTypes, setActivityTypes] = useState([]);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [searchText, setSearchText] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const [sortDirection, setSortDirection] = useState("desc");

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [selectedActivityType, setSelectedActivityType] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [formError, setFormError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const getErrorMessage = (err) => {
        return (
            err?.response?.data?.message ||
            err?.response?.data?.error?.message ||
            err?.response?.data?.data?.message ||
            "در انجام عملیات خطایی رخ داد."
        );
    };

    // دریافت اطلاعات
    const fetchActivityTypes = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            if (appliedSearch.trim()) {
                const result = await searchActivityTypes(appliedSearch.trim());
                const rows = Array.isArray(result) ? [...result] : [];

                rows.sort((a, b) => {
                    const comparison = String(a.title || "").localeCompare(
                        String(b.title || ""),
                        "fa",
                        { sensitivity: "base" }
                    );

                    return sortDirection === "asc"
                        ? comparison
                        : -comparison;
                });

                const count = rows.length;
                const pages = Math.max(1, Math.ceil(count / pageSize));
                const safePage = Math.min(page, pages);

                setTotalElements(count);
                setTotalPages(pages);

                if (safePage !== page) {
                    setPage(safePage);
                    return;
                }

                const startIndex = (page - 1) * pageSize;

                setActivityTypes(
                    rows.slice(startIndex, startIndex + pageSize)
                );

            } else {
                const result = await getActivityTypesByPaging({
                    page: page - 1,
                    size: pageSize,
                    sort: `title,${sortDirection}`
                });

                setActivityTypes(
                    Array.isArray(result?.content) ? result.content : []
                );

                setTotalElements(Number(result?.totalElements || 0));
                setTotalPages(Math.max(1, Number(result?.totalPages || 0)));
            }

        } catch (err) {
            console.error("fetchActivityTypes:", err);

            setActivityTypes([]);
            setTotalElements(0);
            setTotalPages(1);
            setError(getErrorMessage(err));

        } finally {
            setLoading(false);
        }
    }, [
        appliedSearch,
        page,
        pageSize,
        sortDirection
    ]);

    useEffect(() => {
        fetchActivityTypes();
    }, [fetchActivityTypes, refreshKey]);

    // جست‌وجو
    const handleSearch = (event) => {
        event.preventDefault();
        setPage(1);
        setAppliedSearch(searchText.trim());
    };

    const handleClearSearch = () => {
        setSearchText("");
        setAppliedSearch("");
        setPage(1);
    };

    // تعداد رکوردها
    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPage(1);
    };

    // مرتب‌سازی
    const handleSort = () => {
        setSortDirection((current) =>
            current === "asc" ? "desc" : "asc"
        );

        setPage(1);
    };

    // افزودن
    const handleAdd = () => {
        setSelectedActivityType(null);

        setFormData({
            title: "",
            description: ""
        });

        setFormError("");
        setModalMode("add");
        setShowModal(true);
    };

    // مشاهده جزئیات
    const handleShowDetails = async (id) => {
        setShowModal(true);
        setModalMode("view");
        setModalLoading(true);
        setSelectedActivityType(null);

        try {
            const result = await getActivityTypeById(id);
            setSelectedActivityType(result);

        } catch (err) {
            console.error("handleShowDetails:", err);
            setShowModal(false);
            setError(getErrorMessage(err));

        } finally {
            setModalLoading(false);
        }
    };

    // ویرایش
    const handleStartEditing = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!selectedActivityType) return;

        setFormData({
            title: selectedActivityType.title || "",
            description: selectedActivityType.description || ""
        });

        setFormError("");
        setModalMode("edit");
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));

        setFormError("");
    };

    // اعتبارسنجی
    const validateForm = () => {
        const title = formData.title.trim();

        if (!title) {
            setFormError("عنوان نوع فعالیت الزامی است.");
            return false;
        }

        if (title.length > 200) {
            setFormError("عنوان نوع فعالیت نباید بیشتر از ۲۰۰ کاراکتر باشد.");
            return false;
        }

        return true;
    };

    // ثبت و ویرایش
    const handleSave = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        setSaving(true);
        setFormError("");
        setError("");
        setSuccess("");

        try {
            const title = formData.title.trim();

            const request = {
                name: title.substring(0, 100),
                title,
                description: formData.description.trim()
            };

            if (modalMode === "add") {
                await addActivityType(request);
                setSuccess("نوع فعالیت با موفقیت ثبت شد.");
            } else {
                await updateActivityType(
                    selectedActivityType.id,
                    request
                );

                setSuccess("نوع فعالیت با موفقیت ویرایش شد.");
            }

            setShowModal(false);
            setSearchText("");
            setAppliedSearch("");
            setPage(1);
            setRefreshKey((current) => current + 1);

        } catch (err) {
            console.error("handleSave:", err);
            setFormError(getErrorMessage(err));

        } finally {
            setSaving(false);
        }
    };

    // حذف
    const handleDelete = async (activityType) => {
        const confirmed = window.confirm(
            `آیا از حذف نوع فعالیت «${activityType.title}» اطمینان دارید؟`
        );

        if (!confirmed) return;

        setDeletingId(activityType.id);
        setError("");
        setSuccess("");

        try {
            await deleteActivityType(activityType.id);

            setSuccess("نوع فعالیت با موفقیت حذف شد.");

            if (activityTypes.length === 1 && page > 1) {
                setPage((current) => current - 1);
            }

            setRefreshKey((current) => current + 1);

        } catch (err) {
            console.error("handleDelete:", err);
            setError(getErrorMessage(err));

        } finally {
            setDeletingId(null);
        }
    };

    const handleCloseModal = () => {
        if (saving) return;

        setShowModal(false);
        setFormError("");
    };

    // اطلاعات صفحه‌بندی
    const firstRecord = totalElements === 0
        ? 0
        : (page - 1) * pageSize + 1;

    const lastRecord = Math.min(page * pageSize, totalElements);

    return (
        <div className="activity-types-page">

            <div className="activity-types-header">
                <div>
                    <h2>مدیریت انواع فعالیت</h2>
                    <p>
                        ثبت، مشاهده، ویرایش و مدیریت انواع فعالیت کسب‌وکار
                    </p>
                </div>

                <Button variant="primary" onClick={handleAdd}>
                    افزودن نوع فعالیت
                </Button>
            </div>

            {error && (
                <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setError("")}
                >
                    {error}
                </Alert>
            )}

            {success && (
                <Alert
                    variant="success"
                    dismissible
                    onClose={() => setSuccess("")}
                >
                    {success}
                </Alert>
            )}

            {/* نوار ابزار */}
            <div className="activity-types-toolbar">
                <Form
                    className="activity-types-search"
                    onSubmit={handleSearch}
                >
                    <Form.Control
                        type="text"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="جست‌وجو بر اساس عنوان نوع فعالیت..."
                    />

                    <Button type="submit" variant="primary">
                        جست‌وجو
                    </Button>

                    {appliedSearch && (
                        <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={handleClearSearch}
                        >
                            پاک‌کردن
                        </Button>
                    )}
                </Form>

                <div className="activity-types-page-size">
                    <Form.Label>تعداد نمایش در هر صفحه</Form.Label>

                    <Form.Select
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

            {/* جدول */}
            <div className="activity-types-table-wrapper">
                {loading ? (
                    <div className="activity-types-loading">
                        <Spinner animation="border" />
                        <span>در حال دریافت اطلاعات...</span>
                    </div>
                ) : (
                    <Table
                        hover
                        className="activity-types-table"
                    >
                        <thead>
                            <tr>
                                <th
                                    className="sortable-column"
                                    onClick={handleSort}
                                >
                                    عنوان نوع فعالیت
                                    {sortDirection === "asc" ? " ▲" : " ▼"}
                                </th>

                                <th>توضیحات</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {activityTypes.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="activity-types-empty"
                                    >
                                        موردی برای نمایش وجود ندارد.
                                    </td>
                                </tr>
                            ) : (
                                activityTypes.map((activityType) => (
                                    <tr key={activityType.id}>
                                        <td className="activity-types-title">
                                            {activityType.title || "—"}
                                        </td>

                                        <td className="activity-types-description">
                                            {activityType.description || "—"}
                                        </td>

                                        <td>
                                            <div className="activity-types-actions">
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        handleShowDetails(activityType.id)
                                                    }
                                                >
                                                    جزئیات
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    disabled={deletingId === activityType.id}
                                                    onClick={() =>
                                                        handleDelete(activityType)
                                                    }
                                                >
                                                    {deletingId === activityType.id ? (
                                                        <Spinner
                                                            size="sm"
                                                            animation="border"
                                                        />
                                                    ) : (
                                                        "حذف"
                                                    )}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* پایین جدول */}
            <div className="activity-types-footer">
                <div className="activity-types-record-count">
                    نمایش {firstRecord} تا {lastRecord} از {totalElements} رکورد
                </div>

                <div className="activity-types-pagination">
                    <Button
                        variant="outline-secondary"
                        disabled={page <= 1 || loading}
                        onClick={() => setPage((current) => current - 1)}
                    >
                        قبلی
                    </Button>

                    <span>
                        صفحه {page} از {totalPages}
                    </span>

                    <Button
                        variant="outline-secondary"
                        disabled={page >= totalPages || loading}
                        onClick={() => setPage((current) => current + 1)}
                    >
                        بعدی
                    </Button>
                </div>
            </div>

            {/* مودال */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                dialogClassName="activity-types-modal"
                backdrop={saving ? "static" : true}
                keyboard={!saving}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalMode === "add"
                            ? "افزودن نوع فعالیت"
                            : modalMode === "edit"
                                ? "ویرایش نوع فعالیت"
                                : "جزئیات نوع فعالیت"
                        }
                    </Modal.Title>
                </Modal.Header>

                {modalLoading ? (
                    <Modal.Body>
                        <div className="activity-types-modal-loading">
                            <Spinner animation="border" />
                            <span>در حال دریافت اطلاعات...</span>
                        </div>
                    </Modal.Body>
                ) : (
                    <>
                        <Modal.Body>
                            {modalMode === "view" ? (
                                <div className="activity-types-details">
                                    <div>
                                        <span>عنوان نوع فعالیت</span>
                                        <strong>
                                            {selectedActivityType?.title || "—"}
                                        </strong>
                                    </div>

                                    <div className="activity-types-detail-description">
                                        <span>توضیحات</span>
                                        <strong>
                                            {selectedActivityType?.description || "—"}
                                        </strong>
                                    </div>
                                </div>
                            ) : (
                                <Form
                                    id="activity-type-form"
                                    onSubmit={handleSave}
                                >
                                    {formError && (
                                        <Alert variant="danger">
                                            {formError}
                                        </Alert>
                                    )}

                                    <div className="activity-types-form-grid">
                                        <Form.Group>
                                            <Form.Label>
                                                عنوان نوع فعالیت
                                                <span className="required-star"> *</span>
                                            </Form.Label>

                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleFormChange}
                                                maxLength={200}
                                                placeholder="عنوان نوع فعالیت را وارد کنید"
                                                autoFocus
                                                required
                                            />

                                            <Form.Text muted>
                                                حداکثر ۲۰۰ کاراکتر
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="activity-types-description-field">
                                            <Form.Label>
                                                توضیحات
                                            </Form.Label>

                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleFormChange}
                                                rows={4}
                                                placeholder="توضیحات مربوط به نوع فعالیت را وارد کنید..."
                                            />

                                            <Form.Text muted>
                                                واردکردن توضیحات اختیاری است.
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                </Form>
                            )}
                        </Modal.Body>

                        <Modal.Footer>
                            {modalMode === "view" ? (
                                <>
                                    <Button
                                        variant="primary"
                                        onClick={handleStartEditing}
                                    >
                                        ویرایش
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        onClick={handleCloseModal}
                                    >
                                        بستن
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        form="activity-type-form"
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <>
                                                <Spinner
                                                    size="sm"
                                                    animation="border"
                                                    className="ms-2"
                                                />
                                                در حال ذخیره...
                                            </>
                                        ) : (
                                            "ذخیره"
                                        )}
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        onClick={handleCloseModal}
                                        disabled={saving}
                                    >
                                        انصراف
                                    </Button>
                                </>
                            )}
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default ActivityTypesPage;
