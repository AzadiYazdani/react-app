import React, {
    useCallback,
    useEffect,
    useMemo,
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
    getBusinessUnions,
    getBusinessUnionById,
    addBusinessUnion,
    updateBusinessUnion,
    deleteBusinessUnion
} from "../../api/admin/BusinessUnionApi";

import "./BusinessUnionsPage.css";

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

const getErrorMessage = (error) => {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.messageKey ||
        error?.message ||
        "خطایی رخ داده است."
    );
};

const getCityId = (union) => {
    return union?.cityId ?? union?.city?.id ?? "";
};

const getCityName = (union, cityNames) => {
    const cityId = getCityId(union);

    return (
        cityNames[cityId] ||
        union?.city?.name ||
        union?.city?.title ||
        "—"
    );
};

const getProvinceName = (union, cityProvinceIds, provinceNames) => {
    const cityId = getCityId(union);
    const provinceId = cityProvinceIds[cityId];

    return provinceNames[provinceId] || "—";
};

const normalizeSearchText = (value) => {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/[۰-۹]/g, (digit) =>
            String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
        )
        .replace(/[٠-٩]/g, (digit) =>
            String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
        )
        .replace(/\s+/g, " ");
};

function BusinessUnionsPage() {
    const [unions, setUnions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);

    const [cityNames, setCityNames] = useState({});
    const [cityProvinceIds, setCityProvinceIds] = useState({});
    const [provinceNames, setProvinceNames] = useState({});

    const [loading, setLoading] = useState(true);
    const [locationLoading, setLocationLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [searchText, setSearchText] = useState("");
    const [appliedSearchText, setAppliedSearchText] = useState("");

    const [filterProvinceId, setFilterProvinceId] = useState("");
    const [filterCityId, setFilterCityId] = useState("");

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sortField, setSortField] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [selectedUnion, setSelectedUnion] = useState(null);

    const [formData, setFormData] = useState({
        provinceId: "",
        cityId: "",
        title: "",
        boss: "",
        address: "",
        telephone: ""
    });

    const [formCities, setFormCities] = useState([]);
    const [formCitiesLoading, setFormCitiesLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const isBusy = saving || deleting;

    const provinceOptions = useMemo(() => {
        return [...provinces].sort((a, b) =>
            (a.title || a.name || "").localeCompare(
                b.title || b.name || "",
                "fa"
            )
        );
    }, [provinces]);

    const filterCities = useMemo(() => {
        if (!filterProvinceId) {
            return [];
        }

        return cities.filter(
            (city) =>
                String(cityProvinceIds[city.id]) ===
                String(filterProvinceId)
        );
    }, [cities, cityProvinceIds, filterProvinceId]);

    const selectedProvinceName = useMemo(() => {
        const province = provinces.find(
            (item) => String(item.id) === String(filterProvinceId)
        );

        return province?.title || province?.name || "";
    }, [provinces, filterProvinceId]);

    const selectedCityName = useMemo(() => {
        const city = filterCities.find(
            (item) => String(item.id) === String(filterCityId)
        );

        return city?.title || city?.name || "";
    }, [filterCities, filterCityId]);

    const filteredAndSortedUnions = useMemo(() => {
        let result = [...unions];

        if (filterProvinceId) {
            result = result.filter((union) => {
                const cityId = getCityId(union);
                const provinceId = cityProvinceIds[cityId];

                return (
                    String(provinceId) === String(filterProvinceId)
                );
            });
        }

        if (filterCityId) {
            result = result.filter(
                (union) =>
                    String(getCityId(union)) === String(filterCityId)
            );
        }

        const searchValue = normalizeSearchText(appliedSearchText);

        if (searchValue) {
            result = result.filter((union) => {
                const cityName = getCityName(union, cityNames);
                const provinceName = getProvinceName(
                    union,
                    cityProvinceIds,
                    provinceNames
                );

                const searchableValues = [
                    union.title,
                    union.boss,
                    union.telephone,
                    union.address,
                    cityName,
                    provinceName
                ];

                return searchableValues.some((value) =>
                    normalizeSearchText(value).includes(searchValue)
                );
            });
        }

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

        return result;
    }, [
        unions,
        filterProvinceId,
        filterCityId,
        appliedSearchText,
        cityProvinceIds,
        cityNames,
        provinceNames,
        sortField,
        sortDirection
    ]);

    const displayedUnions = useMemo(() => {
        const startIndex = page * pageSize;

        return filteredAndSortedUnions.slice(
            startIndex,
            startIndex + pageSize
        );
    }, [filteredAndSortedUnions, page, pageSize]);

    const currentTotalElements = filteredAndSortedUnions.length;

    const currentTotalPages = Math.ceil(
        currentTotalElements / pageSize
    );

    const firstRecord = currentTotalElements === 0
        ? 0
        : page * pageSize + 1;

    const lastRecord = Math.min(
        (page + 1) * pageSize,
        currentTotalElements
    );

    const fetchLocations = useCallback(async () => {
        setLocationLoading(true);
        setLocationError("");

        try {
            const provincesResponse = await axiosInstance.get(
                "/location/provinces/all"
            );

            const provincesData = getResponseData(provincesResponse);
            const provinceList = Array.isArray(provincesData)
                ? provincesData
                : [];

            setProvinces(provinceList);

            const provinceNameMap = {};

            provinceList.forEach((province) => {
                provinceNameMap[province.id] =
                    province.title || province.name || "";
            });

            setProvinceNames(provinceNameMap);

            const citiesByProvince = await Promise.all(
                provinceList.map(async (province) => {
                    try {
                        const response = await axiosInstance.get(
                            `/location/provinces/${province.id}/cities`
                        );

                        const data = getResponseData(response);

                        return {
                            provinceId: province.id,
                            cities: Array.isArray(data) ? data : []
                        };
                    } catch (locationFetchError) {
                        console.error(
                            `خطا در دریافت شهرهای استان ${province.id}:`,
                            locationFetchError
                        );

                        return {
                            provinceId: province.id,
                            cities: []
                        };
                    }
                })
            );

            const cityNameMap = {};
            const cityProvinceMap = {};
            const allCities = [];

            citiesByProvince.forEach((item) => {
                item.cities.forEach((city) => {
                    cityNameMap[city.id] =
                        city.title || city.name || "";

                    cityProvinceMap[city.id] = item.provinceId;
                    allCities.push(city);
                });
            });

            setCities(allCities);
            setCityNames(cityNameMap);
            setCityProvinceIds(cityProvinceMap);
        } catch (locationFetchError) {
            console.error(
                "خطا در دریافت اطلاعات استان‌ها:",
                locationFetchError
            );

            setLocationError(
                "دریافت اطلاعات استان‌ها و شهرها با خطا مواجه شد."
            );
        } finally {
            setLocationLoading(false);
        }
    }, []);

    const fetchUnions = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getBusinessUnions();
            const result = getListData(response);

            setUnions(result);
        } catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLocations();
    }, [fetchLocations]);

    useEffect(() => {
        fetchUnions();
    }, [fetchUnions]);

    useEffect(() => {
        if (
            currentTotalPages > 0 &&
            page >= currentTotalPages
        ) {
            setPage(currentTotalPages - 1);
        }

        if (currentTotalPages === 0 && page !== 0) {
            setPage(0);
        }
    }, [currentTotalPages, page]);

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

    const handleFilterProvinceChange = (event) => {
        setFilterProvinceId(event.target.value);
        setFilterCityId("");
        setPage(0);
    };

    const handleFilterCityChange = (event) => {
        setFilterCityId(event.target.value);
        setPage(0);
    };

    const handleClearProvinceFilter = () => {
        setFilterProvinceId("");
        setFilterCityId("");
        setPage(0);
    };

    const handleClearCityFilter = () => {
        setFilterCityId("");
        setPage(0);
    };

    const handleClearAllFilters = () => {
        setSearchText("");
        setAppliedSearchText("");
        setFilterProvinceId("");
        setFilterCityId("");
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

    const loadCitiesForProvince = async (provinceId) => {
        if (!provinceId) {
            setFormCities([]);
            return;
        }

        setFormCitiesLoading(true);
        setFormError("");

        try {
            const response = await axiosInstance.get(
                `/location/provinces/${provinceId}/cities`
            );

            const data = getResponseData(response);

            setFormCities(Array.isArray(data) ? data : []);
        } catch (citiesError) {
            setFormCities([]);
            setFormError(
                "دریافت فهرست شهرهای استان انتخاب‌شده ناموفق بود."
            );
        } finally {
            setFormCitiesLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            provinceId: "",
            cityId: "",
            title: "",
            boss: "",
            address: "",
            telephone: ""
        });

        setFormCities([]);
        setFormError("");
    };

    const handleShowAddModal = () => {
        resetForm();
        setSelectedUnion(null);
        setModalMode("add");
        setShowModal(true);
    };

    const handleShowDetails = async (union) => {
        setError("");
        setFormError("");

        setSelectedUnion(union);
        setModalMode("view");
        setShowModal(true);

        try {
            const response = await getBusinessUnionById(union.id);
            const details = getResponseData(response);

            if (details) {
                setSelectedUnion(details);
            }
        } catch (detailsError) {
            setFormError(getErrorMessage(detailsError));
        }
    };

    const handleStartEditing = async () => {
        if (!selectedUnion) {
            return;
        }

        const cityId = getCityId(selectedUnion);
        const provinceId = cityProvinceIds[cityId] || "";

        setFormError("");

        setFormData({
            provinceId: provinceId ? String(provinceId) : "",
            cityId: cityId ? String(cityId) : "",
            title: selectedUnion.title || "",
            boss: selectedUnion.boss || "",
            address: selectedUnion.address || "",
            telephone: selectedUnion.telephone || ""
        });

        setModalMode("edit");

        if (provinceId) {
            await loadCitiesForProvince(provinceId);
        } else {
            setFormCities([]);
            setFormError(
                "استان مربوط به شهر این اتحادیه مشخص نیست. لطفاً اطلاعات شهرها را بررسی کن."
            );
        }
    };

    const handleProvinceChange = async (event) => {
        const provinceId = event.target.value;

        setFormData((current) => ({
            ...current,
            provinceId,
            cityId: ""
        }));

        await loadCitiesForProvince(provinceId);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.provinceId) {
            return "استان را انتخاب کن.";
        }

        if (!formData.cityId) {
            return "شهر را انتخاب کن.";
        }

        if (!formData.title.trim()) {
            return "عنوان اتحادیه الزامی است.";
        }

        if (formData.title.trim().length > 200) {
            return "عنوان اتحادیه نباید بیشتر از ۲۰۰ کاراکتر باشد.";
        }

        if (formData.boss.length > 100) {
            return "نام رئیس اتحادیه نباید بیشتر از ۱۰۰ کاراکتر باشد.";
        }

        if (formData.address.length > 100) {
            return "نشانی نباید بیشتر از ۱۰۰ کاراکتر باشد.";
        }

        if (formData.telephone.length > 50) {
            return "شماره تلفن نباید بیشتر از ۵۰ کاراکتر باشد.";
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

        const requestData = {
            cityId: Number(formData.cityId),
            title: formData.title.trim(),
            boss: formData.boss.trim(),
            address: formData.address.trim(),
            telephone: formData.telephone.trim()
        };

        try {
            if (modalMode === "add") {
                await addBusinessUnion(requestData);
                setSuccessMessage("اتحادیه با موفقیت ثبت شد.");
            } else {
                await updateBusinessUnion(
                    selectedUnion.id,
                    requestData
                );

                setSuccessMessage(
                    "اطلاعات اتحادیه با موفقیت ویرایش شد."
                );
            }

            setShowModal(false);
            setSelectedUnion(null);

            await fetchUnions();
        } catch (saveError) {
            setFormError(getErrorMessage(saveError));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (union) => {
        if (!union) {
            return;
        }

        const confirmed = window.confirm(
            `آیا از حذف اتحادیه «${union.title}» اطمینان داری؟`
        );

        if (!confirmed) {
            return;
        }

        setDeleting(true);
        setError("");
        setSuccessMessage("");

        try {
            await deleteBusinessUnion(union.id);

            setSuccessMessage("اتحادیه با موفقیت حذف شد.");

            if (showModal) {
                setShowModal(false);
                setSelectedUnion(null);
            }

            await fetchUnions();
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
        setSelectedUnion(null);
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
            <div className="business-unions-pagination">
                <Button
                    variant="outline-secondary"
                    size="sm"
                    disabled={page <= 0 || loading}
                    onClick={() =>
                        setPage((current) => current - 1)
                    }
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
                    onClick={() =>
                        setPage((current) => current + 1)
                    }
                >
                    بعدی
                </Button>
            </div>
        );
    };

    return (
        <div className="business-unions-page" dir="rtl">
            <div className="business-unions-header">
                <div>
                    <h2>مدیریت اتحادیه‌ها</h2>
                    <p>ثبت، مشاهده، ویرایش و حذف اتحادیه‌های صنفی</p>
                </div>

                <Button
                    variant="primary"
                    onClick={handleShowAddModal}
                    disabled={
                        locationLoading ||
                        provinces.length === 0
                    }
                >
                    افزودن اتحادیه
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

            {locationError && (
                <Alert
                    variant="warning"
                    dismissible
                    onClose={() => setLocationError("")}
                >
                    {locationError}

                    <Button
                        variant="link"
                        size="sm"
                        onClick={fetchLocations}
                    >
                        تلاش مجدد
                    </Button>
                </Alert>
            )}

            <div className="business-unions-search-panel">
                <Form
                    onSubmit={handleSearch}
                    className="business-unions-search-form"
                >
                    <div className="business-unions-search-field">
                        <svg
                            className="business-unions-search-icon"
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
                            placeholder="عنوان اتحادیه، رئیس، تلفن یا نشانی را جست‌وجو کنید..."
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                            aria-label="جست‌وجوی اتحادیه"
                        />

                        {searchText && (
                            <button
                                type="button"
                                className="business-unions-clear-input"
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
                        className="business-unions-search-button"
                    >
                        جست‌وجو
                    </Button>
                </Form>

                <div className="business-unions-filters-heading">
                    <span>فیلتر بر اساس موقعیت</span>
                    <span>استان و شهر</span>
                </div>

                <div className="business-unions-filters-row">
                    <Form.Group className="business-unions-filter">
                        <Form.Label>استان</Form.Label>

                        <Form.Select
                            value={filterProvinceId}
                            onChange={handleFilterProvinceChange}
                            disabled={locationLoading}
                        >
                            <option value="">
                                {locationLoading
                                    ? "در حال دریافت استان‌ها..."
                                    : "همه استان‌ها"}
                            </option>

                            {provinceOptions.map((province) => (
                                <option
                                    key={province.id}
                                    value={province.id}
                                >
                                    {province.title || province.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="business-unions-filter">
                        <Form.Label>شهر</Form.Label>

                        <Form.Select
                            value={filterCityId}
                            onChange={handleFilterCityChange}
                            disabled={
                                !filterProvinceId ||
                                locationLoading
                            }
                        >
                            <option value="">
                                {!filterProvinceId
                                    ? "ابتدا استان را انتخاب کنید"
                                    : filterCities.length === 0
                                        ? "شهری برای این استان یافت نشد"
                                        : "همه شهرهای استان"}
                            </option>

                            {filterCities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.title || city.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>

                {(appliedSearchText ||
                    filterProvinceId ||
                    filterCityId) && (
                    <div className="business-unions-active-filters">
                        <div className="business-unions-active-filters-title">
                            فیلترهای اعمال‌شده
                        </div>

                        <div className="business-unions-filter-chips">
                            {appliedSearchText && (
                                <button
                                    type="button"
                                    className="business-unions-filter-chip"
                                    onClick={handleClearSearch}
                                >
                                    جست‌وجو: {appliedSearchText}
                                    <span>×</span>
                                </button>
                            )}

                            {filterProvinceId && (
                                <button
                                    type="button"
                                    className="business-unions-filter-chip"
                                    onClick={handleClearProvinceFilter}
                                >
                                    استان: {selectedProvinceName}
                                    <span>×</span>
                                </button>
                            )}

                            {filterCityId && (
                                <button
                                    type="button"
                                    className="business-unions-filter-chip"
                                    onClick={handleClearCityFilter}
                                >
                                    شهر: {selectedCityName}
                                    <span>×</span>
                                </button>
                            )}

                            <button
                                type="button"
                                className="business-unions-clear-filters"
                                onClick={handleClearAllFilters}
                            >
                                پاک کردن همه
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="business-unions-table-wrapper">
                {loading ? (
                    <div className="business-unions-loading">
                        <Spinner animation="border" />
                        <span>در حال دریافت اطلاعات...</span>
                    </div>
                ) : (
                    <Table
                        responsive
                        hover
                        className="business-unions-table"
                    >
                        <thead>
                            <tr>
                                <th
                                    onClick={() => handleSort("id")}
                                    className="sortable-column"
                                >
                                    شناسه{renderSortIndicator("id")}
                                </th>

                                <th
                                    onClick={() => handleSort("title")}
                                    className="sortable-column"
                                >
                                    عنوان اتحادیه{renderSortIndicator("title")}
                                </th>

                                <th>استان</th>
                                <th>شهر</th>
                                <th>رئیس اتحادیه</th>
                                <th>تلفن</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {displayedUnions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="business-unions-empty"
                                    >
                                        {(appliedSearchText ||
                                            filterProvinceId ||
                                            filterCityId)
                                            ? "با جست‌وجو یا فیلترهای انتخاب‌شده اتحادیه‌ای پیدا نشد."
                                            : "هنوز اتحادیه‌ای برای نمایش وجود ندارد."}
                                    </td>
                                </tr>
                            ) : (
                                displayedUnions.map((union) => (
                                    <tr key={union.id}>
                                        <td>{union.id}</td>
                                        <td>{union.title || "—"}</td>
                                        <td>
                                            {getProvinceName(
                                                union,
                                                cityProvinceIds,
                                                provinceNames
                                            )}
                                        </td>
                                        <td>
                                            {getCityName(union, cityNames)}
                                        </td>
                                        <td>{union.boss || "—"}</td>
                                        <td>{union.telephone || "—"}</td>

                                        <td>
                                            <div className="business-unions-actions">
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        handleShowDetails(union)
                                                    }
                                                >
                                                    جزئیات
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    disabled={deleting}
                                                    onClick={() =>
                                                        handleDelete(union)
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

            <div className="business-unions-footer">
                <div className="business-unions-record-count">
                    نمایش {firstRecord} تا {lastRecord} از {currentTotalElements} اتحادیه
                </div>

                <div className="business-unions-footer-controls">
                    <div className="business-unions-page-size">
                        <Form.Label htmlFor="business-unions-page-size">
                            تعداد در صفحه
                        </Form.Label>

                        <Form.Select
                            id="business-unions-page-size"
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
                dialogClassName="business-unions-modal"
            >
                <Modal.Header closeButton={!isBusy}>
                    <Modal.Title>
                        {modalMode === "add"
                            ? "ثبت اتحادیه جدید"
                            : modalMode === "edit"
                                ? "ویرایش اتحادیه"
                                : "جزئیات اتحادیه"}
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

                    {modalMode === "view" && selectedUnion && (
                        <div className="business-unions-details">
                            <div>
                                <span>عنوان اتحادیه</span>
                                <strong>
                                    {selectedUnion.title || "—"}
                                </strong>
                            </div>

                            <div>
                                <span>استان</span>
                                <strong>
                                    {getProvinceName(
                                        selectedUnion,
                                        cityProvinceIds,
                                        provinceNames
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>شهر</span>
                                <strong>
                                    {getCityName(
                                        selectedUnion,
                                        cityNames
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>رئیس اتحادیه</span>
                                <strong>
                                    {selectedUnion.boss || "—"}
                                </strong>
                            </div>

                            <div>
                                <span>نشانی</span>
                                <strong>
                                    {selectedUnion.address || "—"}
                                </strong>
                            </div>

                            <div>
                                <span>تلفن</span>
                                <strong>
                                    {selectedUnion.telephone || "—"}
                                </strong>
                            </div>
                        </div>
                    )}

                    {(modalMode === "add" ||
                        modalMode === "edit") && (
                        <Form onSubmit={handleSubmit}>
                            <div className="business-unions-form-grid">
                                <Form.Group>
                                    <Form.Label>استان</Form.Label>

                                    <Form.Select
                                        name="provinceId"
                                        value={formData.provinceId}
                                        onChange={handleProvinceChange}
                                        disabled={
                                            locationLoading ||
                                            formCitiesLoading ||
                                            isBusy
                                        }
                                    >
                                        <option value="">
                                            {locationLoading
                                                ? "در حال دریافت استان‌ها..."
                                                : "انتخاب استان"}
                                        </option>

                                        {provinceOptions.map((province) => (
                                            <option
                                                key={province.id}
                                                value={province.id}
                                            >
                                                {province.title || province.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>شهر</Form.Label>

                                    <Form.Select
                                        name="cityId"
                                        value={formData.cityId}
                                        onChange={handleInputChange}
                                        disabled={
                                            !formData.provinceId ||
                                            formCitiesLoading ||
                                            isBusy
                                        }
                                    >
                                        <option value="">
                                            {formCitiesLoading
                                                ? "در حال دریافت شهرها..."
                                                : "انتخاب شهر"}
                                        </option>

                                        {formCities.map((city) => (
                                            <option
                                                key={city.id}
                                                value={city.id}
                                            >
                                                {city.title || city.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="business-unions-form-full">
                                    <Form.Label>
                                        عنوان اتحادیه
                                        <span className="text-danger"> *</span>
                                    </Form.Label>

                                    <Form.Control
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        maxLength={200}
                                        required
                                        disabled={isBusy}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>رئیس اتحادیه</Form.Label>

                                    <Form.Control
                                        name="boss"
                                        value={formData.boss}
                                        onChange={handleInputChange}
                                        maxLength={100}
                                        disabled={isBusy}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>تلفن</Form.Label>

                                    <Form.Control
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        maxLength={50}
                                        disabled={isBusy}
                                    />
                                </Form.Group>

                                <Form.Group className="business-unions-form-full">
                                    <Form.Label>نشانی</Form.Label>

                                    <Form.Control
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        maxLength={100}
                                        disabled={isBusy}
                                    />
                                </Form.Group>
                            </div>

                            <div className="business-unions-modal-actions">
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
                                    disabled={isBusy}
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
                            disabled={locationLoading}
                        >
                            ویرایش
                        </Button>

                        <Button
                            variant="outline-danger"
                            disabled={deleting}
                            onClick={() => handleDelete(selectedUnion)}
                        >
                            {deleting
                                ? "در حال حذف..."
                                : "حذف اتحادیه"}
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </div>
    );
}

export default BusinessUnionsPage;
