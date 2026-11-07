import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import {
    Alert,
    Button,
    Form,
    Modal,
    Spinner,
    Table
} from "react-bootstrap";

import axiosInstance from "../../api/axios";

import {
    getBusinessCategoriesByPaging,
    getBusinessCategoriesByUnionId,
    getBusinessCategoryById,
    searchBusinessCategories,
    addBusinessCategory,
    updateBusinessCategory,
    deleteBusinessCategory
} from "../../api/admin/BusinessCategoryApi";

import { getBusinessUnions } from "../../api/admin/BusinessUnionApi";
import useCities from "../../hooks/useCities";

import "./BusinessCategoriesPage.css";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const getResponseData = (response) => {
    return response?.data?.data ?? response?.data ?? response;
};

const getListData = (response) => {
    const data = getResponseData(response);

    if (Array.isArray(data)) {
        return data;
    }

    return Array.isArray(data?.content) ? data.content : [];
};

const getPageContent = (response) => {
    const data = getResponseData(response);

    if (Array.isArray(data)) {
        return {
            content: data,
            totalPages: 1,
            totalElements: data.length
        };
    }

    return {
        content: data?.content || [],
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0
    };
};

const getErrorMessage = (error) => {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.messageKey ||
        error?.message ||
        "خطایی رخ داده است."
    );
};

const normalizeSearchText = (value) => {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/\s+/g, " ");
};

function BusinessCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [unions, setUnions] = useState([]);

    const {
        provinces,
        cities,
        loadingProvinces,
        loadingCities,
        loadProvinces,
        loadCities,
        setSelectedProvince
    } = useCities();

    const [loading, setLoading] = useState(true);
    const [unionsLoading, setUnionsLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");
    const [filterCitiesError, setFilterCitiesError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [searchText, setSearchText] = useState("");
    const [appliedSearchText, setAppliedSearchText] = useState("");

    const [filterProvinceId, setFilterProvinceId] = useState("");
    const [filterCityId, setFilterCityId] = useState("");
    const [filterUnionId, setFilterUnionId] = useState("");

    const [filterCities, setFilterCities] = useState([]);
    const [filterCitiesLoading, setFilterCitiesLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sortField, setSortField] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");

    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [formProvinceId, setFormProvinceId] = useState("");
    const [formCityId, setFormCityId] = useState("");

    const [formData, setFormData] = useState({
        businessUnionId: "",
        title: ""
    });

    const [formError, setFormError] = useState("");

    const pageRequestRef = useRef(0);
    const filteredRequestRef = useRef(0);
    const filterCityRequestRef = useRef(0);

    // مرجع تابع بارگذاری استان‌ها ثابت می‌ماند.
    // تغییر مرجع loadProvinces نباید باعث اجرای مجدد useEffect شود.
    const loadProvincesRef = useRef(loadProvinces);

    const isBusy = saving || deleting;

    const hasLocationFilter = Boolean(
        filterProvinceId || filterCityId || filterUnionId
    );

    const isLocalFiltering = Boolean(
        hasLocationFilter || appliedSearchText
    );

    const unionNames = useMemo(() => {
        const result = {};

        unions.forEach((union) => {
            result[union.id] = union.title || "";
        });

        return result;
    }, [unions]);

    const formUnions = useMemo(() => {
        if (!formCityId) {
            return [];
        }

        return unions.filter(
            (union) => String(union.cityId) === String(formCityId)
        );
    }, [unions, formCityId]);

    const filterUnions = useMemo(() => {
        if (!filterProvinceId) {
            return [];
        }

        const provinceCityIds = new Set(
            filterCities.map((city) => String(city.id))
        );

        let result = unions.filter((union) =>
            provinceCityIds.has(String(union.cityId))
        );

        if (filterCityId) {
            result = result.filter(
                (union) => String(union.cityId) === String(filterCityId)
            );
        }

        return result;
    }, [
        unions,
        filterCities,
        filterProvinceId,
        filterCityId
    ]);

    const filteredCategories = useMemo(() => {
        const result = [...categories];

        if (isLocalFiltering) {
            result.sort((a, b) => {
                const aValue = a?.[sortField] ?? "";
                const bValue = b?.[sortField] ?? "";

                const comparison = String(aValue).localeCompare(
                    String(bValue),
                    "fa",
                    { numeric: true }
                );

                return sortDirection === "asc"
                    ? comparison
                    : -comparison;
            });
        }

        return result;
    }, [
        categories,
        isLocalFiltering,
        sortField,
        sortDirection
    ]);

    const displayedCategories = useMemo(() => {
        if (!isLocalFiltering) {
            return categories;
        }

        const startIndex = page * pageSize;

        return filteredCategories.slice(
            startIndex,
            startIndex + pageSize
        );
    }, [
        categories,
        isLocalFiltering,
        filteredCategories,
        page,
        pageSize
    ]);

    const currentTotalElements = isLocalFiltering
        ? filteredCategories.length
        : totalElements;

    const currentTotalPages = isLocalFiltering
        ? Math.ceil(filteredCategories.length / pageSize)
        : totalPages;

    const firstRecord = currentTotalElements === 0
        ? 0
        : page * pageSize + 1;

    const lastRecord = Math.min(
        (page + 1) * pageSize,
        currentTotalElements
    );

    const selectedProvinceName = useMemo(() => {
        const province = provinces.find(
            (item) => String(item.id) === String(filterProvinceId)
        );

        return province?.name || province?.title || "";
    }, [provinces, filterProvinceId]);

    const selectedCityName = useMemo(() => {
        const city = filterCities.find(
            (item) => String(item.id) === String(filterCityId)
        );

        return city?.name || city?.title || "";
    }, [filterCities, filterCityId]);

    const selectedUnionName = useMemo(() => {
        const union = unions.find(
            (item) => String(item.id) === String(filterUnionId)
        );

        return union?.title || "";
    }, [unions, filterUnionId]);

    const fetchUnions = useCallback(async () => {
        setUnionsLoading(true);

        try {
            const response = await getBusinessUnions();
            const data = getListData(response);

            setUnions(data);
        } catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setUnionsLoading(false);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        const requestId = ++pageRequestRef.current;

        setLoading(true);
        setError("");

        try {
            const response = await getBusinessCategoriesByPaging({
                page,
                size: pageSize,
                sort: `${sortField},${sortDirection}`
            });

            if (requestId !== pageRequestRef.current) {
                return;
            }

            const result = getPageContent(response);

            setCategories(result.content);
            setTotalPages(result.totalPages);
            setTotalElements(result.totalElements);
        } catch (fetchError) {
            if (requestId === pageRequestRef.current) {
                setError(getErrorMessage(fetchError));
            }
        } finally {
            if (requestId === pageRequestRef.current) {
                setLoading(false);
            }
        }
    }, [page, pageSize, sortField, sortDirection]);

    // استان‌ها و اتحادیه‌ها فقط در زمان راه‌اندازی صفحه بارگذاری می‌شوند.
    // loadProvinces عمداً در dependency array قرار نگرفته است؛
    // چون مرجع آن در نسخه فعلی useCities با هر رندر تغییر می‌کند.
    useEffect(() => {
        loadProvincesRef.current();
        fetchUnions();
    }, [fetchUnions]);

    useEffect(() => {
        if (!isLocalFiltering) {
            fetchCategories();
        }
    }, [isLocalFiltering, fetchCategories, refreshKey]);

    useEffect(() => {
        if (!isLocalFiltering) {
            return undefined;
        }

        const requestId = ++filteredRequestRef.current;
        let active = true;

        pageRequestRef.current += 1;

        const loadFilteredCategories = async () => {
            if (filterProvinceId && filterCitiesLoading) {
                setLoading(true);
                return;
            }

            if (filterProvinceId && filterCitiesError) {
                setCategories([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");

            try {
                let result = [];

                if (hasLocationFilter) {
                    let targetUnions = filterUnions;

                    if (filterUnionId) {
                        targetUnions = targetUnions.filter(
                            (union) =>
                                String(union.id) === String(filterUnionId)
                        );
                    }

                    if (targetUnions.length > 0) {
                        const responses = await Promise.all(
                            targetUnions.map((union) =>
                                getBusinessCategoriesByUnionId(union.id)
                            )
                        );

                        result = responses.flatMap(getListData);
                    }
                } else if (appliedSearchText) {
                    const response = await searchBusinessCategories(
                        appliedSearchText
                    );

                    result = getListData(response);
                }

                if (appliedSearchText && hasLocationFilter) {
                    const searchValue = normalizeSearchText(
                        appliedSearchText
                    );

                    result = result.filter((category) => {
                        const categoryTitle = normalizeSearchText(
                            category.title
                        );

                        const unionTitle = normalizeSearchText(
                            unionNames[category.businessUnionId]
                        );

                        return (
                            categoryTitle.includes(searchValue) ||
                            unionTitle.includes(searchValue)
                        );
                    });
                }

                const uniqueCategories = Array.from(
                    new Map(
                        result.map((category) => [
                            String(category.id),
                            category
                        ])
                    ).values()
                );

                if (!active || requestId !== filteredRequestRef.current) {
                    return;
                }

                setCategories(uniqueCategories);
                setTotalPages(1);
                setTotalElements(uniqueCategories.length);
            } catch (fetchError) {
                if (active && requestId === filteredRequestRef.current) {
                    setCategories([]);
                    setTotalPages(0);
                    setTotalElements(0);
                    setError(getErrorMessage(fetchError));
                }
            } finally {
                if (active && requestId === filteredRequestRef.current) {
                    setLoading(false);
                }
            }
        };

        loadFilteredCategories();

        return () => {
            active = false;
        };
    }, [
        isLocalFiltering,
        hasLocationFilter,
        filterProvinceId,
        filterCityId,
        filterUnionId,
        filterUnions,
        filterCitiesLoading,
        filterCitiesError,
        appliedSearchText,
        unionNames,
        refreshKey
    ]);

    useEffect(() => {
        if (
            isLocalFiltering &&
            currentTotalPages > 0 &&
            page >= currentTotalPages
        ) {
            setPage(currentTotalPages - 1);
        }

        if (isLocalFiltering && currentTotalPages === 0 && page !== 0) {
            setPage(0);
        }
    }, [isLocalFiltering, currentTotalPages, page]);

    const handleSearch = (event) => {
        event.preventDefault();

        setAppliedSearchText(searchText.trim());
        setPage(0);
        setError("");
    };

    const handleClearSearch = () => {
        setSearchText("");
        setAppliedSearchText("");
        setPage(0);
        setError("");
    };

    const handleFilterProvinceChange = async (event) => {
        const provinceId = event.target.value;
        const requestId = ++filterCityRequestRef.current;

        setFilterProvinceId(provinceId);
        setFilterCityId("");
        setFilterUnionId("");
        setFilterCities([]);
        setFilterCitiesError("");
        setPage(0);

        if (!provinceId) {
            setFilterCitiesLoading(false);
            return;
        }

        setFilterCitiesLoading(true);

        try {
            const response = await axiosInstance.get(
                `/location/provinces/${provinceId}/cities`
            );

            const data = getListData(response);

            if (requestId === filterCityRequestRef.current) {
                setFilterCities(data);
            }
        } catch (citiesError) {
            if (requestId === filterCityRequestRef.current) {
                setFilterCities([]);
                setFilterCitiesError(
                    "دریافت شهرهای استان انتخاب‌شده ناموفق بود."
                );
            }
        } finally {
            if (requestId === filterCityRequestRef.current) {
                setFilterCitiesLoading(false);
            }
        }
    };

    const handleFilterCityChange = (event) => {
        setFilterCityId(event.target.value);
        setFilterUnionId("");
        setPage(0);
    };

    const handleFilterUnionChange = (event) => {
        setFilterUnionId(event.target.value);
        setPage(0);
    };

    const handleClearProvinceFilter = () => {
        filterCityRequestRef.current += 1;
        setFilterProvinceId("");
        setFilterCityId("");
        setFilterUnionId("");
        setFilterCities([]);
        setFilterCitiesLoading(false);
        setFilterCitiesError("");
        setPage(0);
    };

    const handleClearCityFilter = () => {
        setFilterCityId("");
        setFilterUnionId("");
        setPage(0);
    };

    const handleClearUnionFilter = () => {
        setFilterUnionId("");
        setPage(0);
    };

    const handleClearAllFilters = () => {
        filterCityRequestRef.current += 1;

        setSearchText("");
        setAppliedSearchText("");
        setFilterProvinceId("");
        setFilterCityId("");
        setFilterUnionId("");
        setFilterCities([]);
        setFilterCitiesLoading(false);
        setFilterCitiesError("");
        setPage(0);
        setError("");
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection((current) =>
                current === "asc" ? "desc" : "asc"
            );
        } else {
            setSortField(field);
            setSortDirection("asc");
        }

        setPage(0);
    };

    const refreshCurrentCategories = () => {
        setRefreshKey((current) => current + 1);
    };

    const resetForm = () => {
        setFormProvinceId("");
        setFormCityId("");
        setSelectedProvince(null);

        setFormData({
            businessUnionId: "",
            title: ""
        });

        setFormError("");
    };

    const handleShowAddModal = () => {
        resetForm();
        setSelectedCategory(null);
        setModalMode("add");
        setShowModal(true);
    };

    const handleShowDetails = async (category) => {
        setFormError("");
        setSelectedCategory(category);
        setModalMode("view");
        setShowModal(true);

        try {
            const response = await getBusinessCategoryById(category.id);
            const details = getResponseData(response);

            if (details) {
                setSelectedCategory(details);
            }
        } catch (detailsError) {
            setFormError(getErrorMessage(detailsError));
        }
    };

    const handleProvinceChange = async (event) => {
        const provinceId = event.target.value;

        setFormProvinceId(provinceId);
        setFormCityId("");

        setFormData((current) => ({
            ...current,
            businessUnionId: ""
        }));

        const province = provinces.find(
            (item) => String(item.id) === String(provinceId)
        );

        setSelectedProvince(province || null);

        if (provinceId) {
            await loadCities(provinceId);
        }
    };

    const handleCityChange = (event) => {
        const cityId = event.target.value;

        setFormCityId(cityId);

        setFormData((current) => ({
            ...current,
            businessUnionId: ""
        }));
    };

    const findProvinceByCityId = async (cityId) => {
        for (const province of provinces) {
            try {
                const response = await axiosInstance.get(
                    `/location/provinces/${province.id}/cities`
                );

                const provinceCities = getListData(response);

                const cityExists = provinceCities.some(
                    (city) => String(city.id) === String(cityId)
                );

                if (cityExists) {
                    setFormProvinceId(String(province.id));
                    setFormCityId(String(cityId));
                    setSelectedProvince(province);

                    await loadCities(province.id);

                    return true;
                }
            } catch (citiesError) {
                // در صورت خطای یک استان، بررسی استان بعدی ادامه پیدا می‌کند.
            }
        }

        return false;
    };

    const handleStartEditing = async () => {
        if (!selectedCategory) {
            return;
        }

        setFormError("");

        const currentUnion = unions.find(
            (union) =>
                String(union.id) ===
                String(selectedCategory.businessUnionId)
        );

        if (!currentUnion) {
            setFormError("اطلاعات اتحادیه این رسته یافت نشد.");
            return;
        }

        if (!currentUnion.cityId) {
            setFormError("اطلاعات شهر اتحادیه در دسترس نیست.");
            return;
        }

        const found = await findProvinceByCityId(currentUnion.cityId);

        if (!found) {
            setFormError("استان مربوط به اتحادیه پیدا نشد.");
            return;
        }

        setFormData({
            businessUnionId: String(
                selectedCategory.businessUnionId ?? ""
            ),
            title: selectedCategory.title || ""
        });

        setModalMode("edit");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formProvinceId) {
            return "انتخاب استان الزامی است.";
        }

        if (!formCityId) {
            return "انتخاب شهر الزامی است.";
        }

        if (!formData.businessUnionId) {
            return "انتخاب اتحادیه الزامی است.";
        }

        if (!formData.title.trim()) {
            return "عنوان رسته الزامی است.";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setFormError(validationError);
            return;
        }

        setSaving(true);
        setFormError("");
        setError("");
        setSuccessMessage("");

        const businessUnionId = Number(formData.businessUnionId);
        const title = formData.title.trim();

        try {
            if (modalMode === "add") {
                await addBusinessCategory(businessUnionId, title);
                setSuccessMessage("رسته با موفقیت ثبت شد.");
            } else {
                await updateBusinessCategory(
                    selectedCategory.id,
                    businessUnionId,
                    title
                );

                setSuccessMessage("اطلاعات رسته با موفقیت ویرایش شد.");
            }

            setShowModal(false);
            setSelectedCategory(null);

            refreshCurrentCategories();
        } catch (saveError) {
            setFormError(getErrorMessage(saveError));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (category) => {
        if (!category) {
            return;
        }

        const confirmed = window.confirm(
            `آیا از حذف رسته «${category.title}» اطمینان داری؟`
        );

        if (!confirmed) {
            return;
        }

        setDeleting(true);
        setError("");
        setSuccessMessage("");

        try {
            await deleteBusinessCategory(category.id);

            setSuccessMessage("رسته با موفقیت حذف شد.");

            if (showModal) {
                setShowModal(false);
                setSelectedCategory(null);
            }

            refreshCurrentCategories();
        } catch (deleteError) {
            setError(getErrorMessage(deleteError));
        } finally {
            setDeleting(false);
        }
    };

    const handleCloseModal = () => {
        if (isBusy) {
            return;
        }

        setShowModal(false);
        setSelectedCategory(null);
        resetForm();
    };

    const renderSortIndicator = (field) => {
        if (sortField !== field) {
            return null;
        }

        return sortDirection === "asc" ? " ▲" : " ▼";
    };

    const renderPagination = () => {
        if (currentTotalPages <= 1) {
            return null;
        }

        return (
            <div className="business-categories-pagination">
                <Button
                    variant="outline-secondary"
                    size="sm"
                    disabled={page <= 0 || loading}
                    onClick={() => setPage((current) => current - 1)}
                >
                    قبلی
                </Button>

                <span>
                    صفحه {page + 1} از {currentTotalPages}
                </span>

                <Button
                    variant="outline-secondary"
                    size="sm"
                    disabled={
                        page + 1 >= currentTotalPages || loading
                    }
                    onClick={() => setPage((current) => current + 1)}
                >
                    بعدی
                </Button>
            </div>
        );
    };

    return (
        <div className="business-categories-page" dir="rtl">
            <div className="business-categories-header">
                <div>
                    <h2>مدیریت رسته‌های شغلی</h2>
                    <p>ثبت، مشاهده، ویرایش و حذف رسته‌های شغلی</p>
                </div>

                <Button
                    variant="primary"
                    onClick={handleShowAddModal}
                    disabled={
                        unionsLoading ||
                        unions.length === 0 ||
                        loadingProvinces
                    }
                >
                    افزودن رسته
                </Button>
            </div>

            {successMessage && (
                <Alert
                    variant="success"
                    dismissible
                    onClose={() => setSuccessMessage("")}
                >
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setError("")}
                >
                    {error}
                </Alert>
            )}

            {!unionsLoading && unions.length === 0 && (
                <Alert variant="warning">
                    اتحادیه‌ای برای انتخاب وجود ندارد. ابتدا باید حداقل یک اتحادیه ثبت شود.
                </Alert>
            )}

            <div className="business-categories-search-panel">
                <Form
                    onSubmit={handleSearch}
                    className="business-categories-search-form"
                >
                    <div className="business-categories-search-field">
                        <svg
                            className="business-categories-search-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                cx="10.8"
                                cy="10.8"
                                r="6.8"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            />
                            <path
                                d="m16 16 4.5 4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>

                        <Form.Control
                            type="text"
                            placeholder="عنوان رسته شغلی را جست‌وجو کنید..."
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                            aria-label="جست‌وجوی رسته شغلی"
                        />

                        {searchText && (
                            <button
                                type="button"
                                className="business-categories-clear-input"
                                onClick={handleClearSearch}
                                aria-label="پاک کردن عبارت جست‌وجو"
                                title="پاک کردن"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="business-categories-search-button"
                    >
                        جست‌وجو
                    </Button>
                </Form>

                <div className="business-categories-filters-heading">
                    <span>فیلتر بر اساس موقعیت</span>
                    <span>استان، شهر و اتحادیه</span>
                </div>

                <div className="business-categories-filters-row">
                    <Form.Group className="business-categories-filter">
                        <Form.Label>استان</Form.Label>

                        <Form.Select
                            value={filterProvinceId}
                            onChange={handleFilterProvinceChange}
                            disabled={loadingProvinces}
                        >
                            <option value="">
                                {loadingProvinces
                                    ? "در حال دریافت استان‌ها..."
                                    : "همه استان‌ها"}
                            </option>

                            {provinces.map((province) => (
                                <option
                                    key={province.id}
                                    value={province.id}
                                >
                                    {province.name || province.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="business-categories-filter">
                        <Form.Label>شهر</Form.Label>

                        <Form.Select
                            value={filterCityId}
                            onChange={handleFilterCityChange}
                            disabled={
                                !filterProvinceId ||
                                filterCitiesLoading
                            }
                        >
                            <option value="">
                                {!filterProvinceId
                                    ? "ابتدا استان را انتخاب کنید"
                                    : filterCitiesLoading
                                        ? "در حال دریافت شهرها..."
                                        : "همه شهرهای استان"}
                            </option>

                            {filterCities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name || city.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="business-categories-filter">
                        <Form.Label>اتحادیه</Form.Label>

                        <Form.Select
                            value={filterUnionId}
                            onChange={handleFilterUnionChange}
                            disabled={
                                !filterCityId ||
                                unionsLoading ||
                                filterCitiesLoading
                            }
                        >
                            <option value="">
                                {!filterCityId
                                    ? "ابتدا شهر را انتخاب کنید"
                                    : filterUnions.length === 0
                                        ? "اتحادیه‌ای در این شهر وجود ندارد"
                                        : "همه اتحادیه‌های شهر"}
                            </option>

                            {filterUnions.map((union) => (
                                <option key={union.id} value={union.id}>
                                    {union.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>

                {filterCitiesLoading && (
                    <div className="business-categories-filter-loading">
                        <Spinner size="sm" animation="border" />
                        <span>در حال دریافت شهرهای استان...</span>
                    </div>
                )}

                {filterCitiesError && (
                    <Alert
                        variant="warning"
                        className="business-categories-filter-error"
                        dismissible
                        onClose={() => setFilterCitiesError("")}
                    >
                        {filterCitiesError}
                    </Alert>
                )}

                {(appliedSearchText ||
                    filterProvinceId ||
                    filterCityId ||
                    filterUnionId) && (
                    <div className="business-categories-active-filters">
                        <div className="business-categories-active-filters-title">
                            فیلترهای اعمال‌شده
                        </div>

                        <div className="business-categories-filter-chips">
                            {appliedSearchText && (
                                <button
                                    type="button"
                                    className="business-categories-filter-chip"
                                    onClick={handleClearSearch}
                                >
                                    جست‌وجو: {appliedSearchText}
                                    <span>×</span>
                                </button>
                            )}

                            {filterProvinceId && (
                                <button
                                    type="button"
                                    className="business-categories-filter-chip"
                                    onClick={handleClearProvinceFilter}
                                >
                                    استان: {selectedProvinceName}
                                    <span>×</span>
                                </button>
                            )}

                            {filterCityId && (
                                <button
                                    type="button"
                                    className="business-categories-filter-chip"
                                    onClick={handleClearCityFilter}
                                >
                                    شهر: {selectedCityName}
                                    <span>×</span>
                                </button>
                            )}

                            {filterUnionId && (
                                <button
                                    type="button"
                                    className="business-categories-filter-chip"
                                    onClick={handleClearUnionFilter}
                                >
                                    اتحادیه: {selectedUnionName}
                                    <span>×</span>
                                </button>
                            )}

                            <button
                                type="button"
                                className="business-categories-clear-filters"
                                onClick={handleClearAllFilters}
                            >
                                پاک کردن همه
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="business-categories-table-wrapper">
                {loading ? (
                    <div className="business-categories-loading">
                        <Spinner animation="border" />
                        <span>در حال دریافت اطلاعات...</span>
                    </div>
                ) : (
                    <Table
                        responsive
                        hover
                        className="business-categories-table"
                    >
                        <thead>
                            <tr>
                                <th
                                    className="sortable-column"
                                    onClick={() => handleSort("title")}
                                >
                                    عنوان رسته{renderSortIndicator("title")}
                                </th>

                                <th>اتحادیه</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {displayedCategories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="business-categories-empty"
                                    >
                                        {isLocalFiltering
                                            ? "با فیلترهای انتخاب‌شده رسته‌ای پیدا نشد."
                                            : "هنوز رسته‌ای برای نمایش وجود ندارد."}
                                    </td>
                                </tr>
                            ) : (
                                displayedCategories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.title || "—"}</td>
                                        <td>
                                            {unionNames[category.businessUnionId] || "—"}
                                        </td>
                                        <td>
                                            <div className="business-categories-actions">
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        handleShowDetails(category)
                                                    }
                                                >
                                                    جزئیات
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    disabled={deleting}
                                                    onClick={() =>
                                                        handleDelete(category)
                                                    }
                                                >
                                                    حذف
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

            <div className="business-categories-footer">
                <div className="business-categories-record-count">
                    نمایش {firstRecord} تا {lastRecord} از {currentTotalElements} رسته
                </div>

                <div className="business-categories-footer-controls">
                    <div className="business-categories-page-size">
                        <Form.Label htmlFor="business-categories-page-size">
                            تعداد در صفحه
                        </Form.Label>

                        <Form.Select
                            id="business-categories-page-size"
                            size="sm"
                            value={pageSize}
                            onChange={(event) => {
                                setPageSize(Number(event.target.value));
                                setPage(0);
                            }}
                        >
                            {PAGE_SIZE_OPTIONS.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    {renderPagination()}
                </div>
            </div>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                size="lg"
                backdrop={isBusy ? "static" : true}
                keyboard={!isBusy}
                dialogClassName="business-categories-modal"
            >
                <Modal.Header closeButton={!isBusy}>
                    <Modal.Title>
                        {modalMode === "add"
                            ? "ثبت رسته جدید"
                            : modalMode === "edit"
                                ? "ویرایش رسته"
                                : "جزئیات رسته"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {formError && (
                        <Alert
                            variant="danger"
                            dismissible
                            onClose={() => setFormError("")}
                        >
                            {formError}
                        </Alert>
                    )}

                    {modalMode === "view" && selectedCategory && (
                        <div className="business-categories-details">
                            <div>
                                <span>عنوان رسته</span>
                                <strong>
                                    {selectedCategory.title || "—"}
                                </strong>
                            </div>

                            <div>
                                <span>اتحادیه</span>
                                <strong>
                                    {unionNames[selectedCategory.businessUnionId] || "—"}
                                </strong>
                            </div>
                        </div>
                    )}

                    {(modalMode === "add" || modalMode === "edit") && (
                        <Form onSubmit={handleSubmit}>
                            <div className="business-categories-form-grid">
                                <Form.Group>
                                    <Form.Label>
                                        استان
                                        <span className="text-danger"> *</span>
                                    </Form.Label>

                                    <Form.Select
                                        value={formProvinceId}
                                        onChange={handleProvinceChange}
                                        disabled={loadingProvinces || isBusy}
                                        required
                                    >
                                        <option value="">
                                            {loadingProvinces
                                                ? "در حال دریافت استان‌ها..."
                                                : "انتخاب استان"}
                                        </option>

                                        {provinces.map((province) => (
                                            <option
                                                key={province.id}
                                                value={province.id}
                                            >
                                                {province.name || province.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>
                                        شهر
                                        <span className="text-danger"> *</span>
                                    </Form.Label>

                                    <Form.Select
                                        value={formCityId}
                                        onChange={handleCityChange}
                                        disabled={
                                            !formProvinceId ||
                                            loadingCities ||
                                            isBusy
                                        }
                                        required
                                    >
                                        <option value="">
                                            {!formProvinceId
                                                ? "ابتدا استان را انتخاب کنید"
                                                : loadingCities
                                                    ? "در حال دریافت شهرها..."
                                                    : "انتخاب شهر"}
                                        </option>

                                        {cities.map((city) => (
                                            <option
                                                key={city.id}
                                                value={city.id}
                                            >
                                                {city.name || city.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>
                                        اتحادیه
                                        <span className="text-danger"> *</span>
                                    </Form.Label>

                                    <Form.Select
                                        name="businessUnionId"
                                        value={formData.businessUnionId}
                                        onChange={handleInputChange}
                                        disabled={
                                            !formCityId ||
                                            unionsLoading ||
                                            isBusy
                                        }
                                        required
                                    >
                                        <option value="">
                                            {!formCityId
                                                ? "ابتدا شهر را انتخاب کنید"
                                                : formUnions.length === 0
                                                    ? "اتحادیه‌ای در این شهر وجود ندارد"
                                                    : "انتخاب اتحادیه"}
                                        </option>

                                        {formUnions.map((union) => (
                                            <option
                                                key={union.id}
                                                value={union.id}
                                            >
                                                {union.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>
                                        عنوان رسته
                                        <span className="text-danger"> *</span>
                                    </Form.Label>

                                    <Form.Control
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        maxLength={200}
                                        disabled={isBusy}
                                    />
                                </Form.Group>
                            </div>

                            <div className="business-categories-modal-actions">
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseModal}
                                    disabled={isBusy}
                                >
                                    انصراف
                                </Button>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={
                                        isBusy ||
                                        unionsLoading ||
                                        loadingCities ||
                                        !formUnions.length
                                    }
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
                            </div>
                        </Form>
                    )}
                </Modal.Body>

                {modalMode === "view" && (
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseModal}
                        >
                            بستن
                        </Button>

                        <Button
                            variant="primary"
                            onClick={handleStartEditing}
                            disabled={loadingProvinces || loadingCities}
                        >
                            ویرایش
                        </Button>

                        <Button
                            variant="outline-danger"
                            disabled={deleting}
                            onClick={() => handleDelete(selectedCategory)}
                        >
                            {deleting ? "در حال حذف..." : "حذف رسته"}
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
    );
}

export default BusinessCategoriesPage;
